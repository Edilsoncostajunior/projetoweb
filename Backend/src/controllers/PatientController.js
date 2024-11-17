import Patient from '../models/Patient.js';
import getToken from "../utils/jwt/get-token.js";
import getNurseByToken from '../utils/jwt/get-nurse-by-token.js';

class PatientController {

  // Listar pacientes de uma enfermeira
  async getPatients(req, res) {
    const token = getToken(req);
    const nurse = await getNurseByToken(token);

    try {
      const patients = await Patient.findAll({ where: { nurseId: nurse.id } });
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar pacientes: ' + error.message });
    }
  }

  // Listar um paciente de uma enfermeira
  async getPatient(req, res) {

    const id = req.params.id;

    try {
      const patient = await Patient.findByPk(id);
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar pacientes: ' + error.message });
    }
  }

  async deletePatient(req, res) {
    try {
      // Obtém o token da requisição
      const token = getToken(req);
      const nurse = await getNurseByToken(token);

      // Obtém o ID do paciente
      const id = req.params.id;

      // Verifica se o paciente existe e se pertence à enfermeira
      const patient = await Patient.findOne({ where: { id, nurseId: nurse.id } });
      if (!patient) {
        return res.status(404).json({ error: "Paciente não encontrado ou não pertence à enfermeira." });
      }

      // Exclui o paciente
      await patient.destroy();
      res.status(200).json({ message: "Paciente excluído com sucesso." });
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir paciente." });
    }
  }


  async updatePatient(req, res) {
    try {
      // Obtém o token da requisição
      const token = getToken(req);
      const nurse = await getNurseByToken(token);

      // Obtém o ID do paciente e os novos dados a partir do body da requisição
      const { id } = req.params;
      const { name, email, phone, paridade, idadeGestacional, dataUltimaMenstruacao, birthDate } = req.body;

      // Verifica se o paciente existe
      const patient = await Patient.findOne({ where: { id, nurseId: nurse.id } });
      if (!patient) {
        return res.status(404).json({ error: "Paciente não encontrado ou não pertence à enfermeira." });
      }

      // Atualiza os dados do paciente
      patient.name = name || patient.name;
      patient.email = email || patient.email;
      patient.phone = phone || patient.phone;
      patient.paridade = paridade || patient.paridade;
      patient.idadeGestacional = idadeGestacional || patient.idadeGestacional;
      patient.dataUltimaMenstruacao = dataUltimaMenstruacao || patient.dataUltimaMenstruacao;
      patient.birthDate = birthDate || patient.birthDate

      await patient.save();
      res.status(200).json({ message: "Paciente atualizado com sucesso.", patient });
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar paciente." });
    }
  }
  // Adição de paciente pela enfermeira
  async addPatient(req, res) {
    const token = getToken(req);
    const nurse = await getNurseByToken(token);
    const { name, email, phone, paridade, idadeGestacional, dataUltimaMenstruacao, cpf, birthDate } = req.body;

    // Verificar campos obrigatórios
    if (!name ||  !dataUltimaMenstruacao ) {
      return sendError(res, "Todos os dados são obrigatórios!");
    }

    // Verificar se o email ou CPF já existe no banco
    const patientExists = await Patient.findOne({ where: { email } });
    const cpfExists = await Patient.findOne({ where: { cpf } });

    if (patientExists) {
      return res.status(409).json({ error: 'E-mail já cadastrado para outro paciente!' });
    }

    if (cpfExists) {
      return res.status(409).json({ error: 'CPF já cadastrado para outro paciente!' });
    }

    try {
      const patient = await Patient.create({
        name,
        email,
        phone,
        paridade,
        idadeGestacional,
        dataUltimaMenstruacao,
        cpf,
        birthDate,
        nurseId: nurse.id
      });
      res.status(201).json(patient);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar paciente: ' + error.message });
    }
  }
}

export default new PatientController();
