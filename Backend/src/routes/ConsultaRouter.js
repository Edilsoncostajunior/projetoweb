import express from "express";
import ConsultaController from '../controllers/ConsultaController.js';

const consultRouter = express.Router();

// Rotas para consultas
consultRouter.post('/consultas', ConsultaController.addConsulta);                    // Rota para adicionar consulta
consultRouter.get('/consultas', ConsultaController.getAllConsultasByNurse);          // Rota para buscar todas as consultas dos pacientes do enfermeiro logado
consultRouter.get('/consultas/paciente/:patientId', ConsultaController.getConsultasByPatient); // Rota para buscar consultas de um paciente específico

export default consultRouter;
