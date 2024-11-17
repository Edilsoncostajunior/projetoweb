import { DataTypes } from 'sequelize';
import Nurse from './Nurse.js';
import db from '../db.js';

const Consulta = db.define('consulta', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  anotacao: {
    type: DataTypes.STRING(5000),
  },
  dataConsulta: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  }
}, {
  timestamps: true,
});

Consulta.associate = (models) => {
  Consulta.belongsTo(models.Patient, { foreignKey: 'patientId' });
  Consulta.belongsTo(models.Nurse, { foreignKey: 'nurseId' });
};

export default Consulta;
