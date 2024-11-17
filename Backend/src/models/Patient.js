import { DataTypes } from 'sequelize';
import Nurse from './Nurse.js';
import Consulta from './Consulta.js';
import db from '../db.js';

const Patient = db.define('patient', {
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
  paridade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idadeGestacional: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dataUltimaMenstruacao: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  birthDate:{
    type: DataTypes.DATEONLY,
    allowNull: true ,
  }
}, {
  timestamps: true,
});


Patient.associate = (models) => {
  Patient.belongsTo(models.Nurse, { foreignKey: 'nurseId' });
  Patient.hasMany(models.Consulta, { foreignKey: 'patientId' });
};

export default Patient;
