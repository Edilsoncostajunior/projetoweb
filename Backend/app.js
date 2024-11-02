import express from "express";
import consultarouter from "./src//routes/ConsultaRouter.js";
import patientRouter from "./src/routes/PatientRouter.js";
import nurseRouter from "./src/routes/NurseRouter.js";
import cors from "cors";
import db from "./src/db.js";
import Nurse from "./src/models/Nurse.js";
import Patient from "./src/models/Patient.js";
import Consulta from "./src/models/Consulta.js";

const app = express();

app.use(express.json());
app.use(express.static('public'))
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))


Nurse.associate({ Patient, Consulta });
Patient.associate({ Nurse, Consulta });
Consulta.associate({ Nurse, Patient });

app.use("/consulta", consultarouter);
app.use("/nurse", nurseRouter);
app.use("/patient", patientRouter);



db.sync({ alter: true })
  .then(() => {
    console.log(`Banco de dados conectado: ${process.env.DB_NAME}`);
  })
  .catch((error) => {
    console.error('Erro:', error);
  });


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
