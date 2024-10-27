import Nurse from '../models/Nurse.js';
import bcrypt from 'bcrypt';
import createUserToken from "../utils/jwt/create-user-token.js";
import getToken from "../utils/jwt/get-token.js";
import getNurseByToken from '../utils/jwt/get-nurse-by-token.js';
import Patient from '../models/Patient.js';
import { validateEmail, validateCPF } from '../utils/validators.js'; // Assumindo que as funções de validação estão neste arquivo

class NurseController {

  // Registro da enfermeira
  async register(req, res) {
    const { name, email, password, cpf, phone, coren } = req.body;

    // Verificar campos obrigatórios
    if (!name || !email || !password || !cpf || !phone || !coren) {
      return sendError(res, "Todos os campos são obrigatórios!");
    }

    // Validar formato de email
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Formato de email inválido" });
    }

    // Validar formato de CPF
    if (!validateCPF(cpf)) {
      return res.status(400).json({ error: "Formato de CPF inválido" });
    }

    // Verificar se o email já existe
    const nurseExists = await Nurse.findOne({ where: { email } });
    if (nurseExists) {
      return res.status(409).json({ error: 'E-mail já cadastrado!' });
    }

    try {
      const passwordHash = await hashPassword(password);
      const newNurse = await Nurse.create({ name, email, password: passwordHash, cpf, phone, coren });
      res.status(201).json(newNurse);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao registrar enfermeira: ' + error.message });
    }
  }

  // Login da enfermeira
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, "Todos os campos são obrigatórios!");
    }

    try {
      const nurse = await Nurse.findOne({ where: { email } });
      if (!nurse) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const checkPassword = await comparePassword(password, nurse.password);
      if (!checkPassword) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      await createUserToken(nurse, req, res);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao efetuar login: ' + error.message });
    }
  }
}

async function sendError(res, message) {
  res.status(422).json({ message });
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
}

async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

export default new NurseController();
