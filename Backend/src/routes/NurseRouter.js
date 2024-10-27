import express from "express";
import NurseController from '../controllers/NurseController.js';


const nurseRouter = express.Router();

// Rotas para enfermeira
nurseRouter.post('/nurses/register', NurseController.register);  // Rota para registrar enfermeira
nurseRouter.post('/nurses/login', NurseController.login);        // Rota para login da enfermeira

export default nurseRouter;
