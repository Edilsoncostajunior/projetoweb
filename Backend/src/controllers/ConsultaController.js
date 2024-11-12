import Consulta from '../models/Consulta.js';
import getToken from "../utils/jwt/get-token.js";
import getNurseByToken from '../utils/jwt/get-nurse-by-token.js';
import Patient from '../models/Patient.js';

class ConsultaController {

  // Adicionar consulta
  async addConsulta(req, res) {
    const token = getToken(req);
    const nurse = await getNurseByToken(token);
    const { anotacao, dataConsulta } = req.body;

    const id = req.params.id;

    if (!anotacao || !dataConsulta) {
      return sendError(res, "Todos os campos são obrigatórios!");
    }

    try {
      const patient = await Patient.findOne({ where: { id: id, nurseId: nurse.id } });
      if (!patient) {
        return res.status(404).json({ error: 'Paciente não encontrado ou não associado à enfermeira' });
      }

      const consulta = await Consulta.create({
        anotacao,
        dataConsulta,
        nurseId: nurse.id,
        patientId: id
      });
      res.status(201).json(consulta);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar consulta: ' + error.message });
    }
  }

  // Retornar todas as consultas de todos os pacientes do enfermeiro logado
  async getAllConsultasByNurse(req, res) {

    const token = getToken(req);
    const nurse = await getNurseByToken(token);
    const consultaId = req.params.consultaId;

    try {
      const consultas = await Consulta.findAll({
        where: { nurseId: nurse.id },
        include: { model: Patient, attributes: ['name', 'email'] }  // Inclui os dados do paciente
      });
      res.status(200).json(consultas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar consultas: ' + error.message });
    }
  }

  // Retornar todas as consultas de um paciente específico
  async getConsultasByPatient(req, res) {
    const token = getToken(req);
    const nurse = await getNurseByToken(token);
    const id = req.params.id;

    try {
      const patient = await Patient.findOne({ where: { id: id, nurseId: nurse.id } });
      if (!patient) {
        return res.status(404).json({ error: 'Paciente não encontrado ou não associado à enfermeira' });
      }

      const consultas = await Consulta.findAll({ where: { patientId: id } });
      res.status(200).json(consultas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar consultas: ' + error.message });
    }
  }


  // Função para deletar uma consulta específica
  async deleteConsulta(req, res) {
    const token = getToken(req);
    const nurse = await getNurseByToken(token);
    const consultaId = req.params.consultaId;

    try {
      // Verifica se a consulta pertence ao enfermeiro logado
      const consulta = await Consulta.findOne({
        where: { id: consultaId, nurseId: nurse.id }
      });

      if (!consulta) {
        return res.status(404).json({ error: 'Consulta não encontrada ou não associada à enfermeira' });
      }

      // Deleta a consulta
      await consulta.destroy();
      res.status(200).json({ message: 'Consulta deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar consulta: ' + error.message });
    }
  }

}

async function sendError(res, message) {
  res.status(422).json({ message });
}

export default new ConsultaController();
