import { DataTypes } from 'sequelize';
import Patient from './Patient.js';
import Consulta from './Consulta.js';
import db from '../db.js';

const Nurse = db.define('nurse', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [11, 11],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coren: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

Nurse.associate = (models) => {
  Nurse.hasMany(models.Patient, { foreignKey: 'nurseId' });
  Nurse.hasMany(models.Consulta, {foreignKey: 'nurseId'})
};

export default Nurse;
