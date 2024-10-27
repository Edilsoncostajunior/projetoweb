import express from "express";
import PatientController from '../controllers/PatientController.js';

const patientRouter = express.Router();

// Rotas para pacientes
patientRouter.get('/patients', PatientController.getPatients);       // Rota para listar pacientes da enfermeira
patientRouter.post('/patients', PatientController.addPatient);       // Rota para adicionar paciente
patientRouter.put('/patients/:id', PatientController.updatePatient); // Rota para atualizar paciente
patientRouter.delete('/patients/:id', PatientController.deletePatient); // Rota para deletar paciente

export default patientRouter;
