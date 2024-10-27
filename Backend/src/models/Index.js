import Patient from './Patient.js';
import Consulta from './Consulta.js';
import Nurse from './Nurse.js'

Patient.belongsTo(Nurse, { foreignKey: 'nurseId', onDelete: 'CASCADE' });
Patient.hasMany(Consulta, { foreignKey: 'patientId', onDelete: 'CASCADE' });


Nurse.hasMany(Patient, { foreignKey: 'nurseId', onDelete: 'CASCADE' });
Nurse.hasMany(Consulta, { foreignKey: 'nurseId', onDelete: 'CASCADE' });

Consulta.belongsTo(Nurse, { foreignKey: 'nurseId', onDelete: 'CASCADE' });
Consulta.belongsTo(Patient, { foreignKey: 'patientId', onDelete: 'CASCADE' });


export default {Patient, Nurse, Consulta};
