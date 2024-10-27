import jwt from 'jsonwebtoken';
import Nurse from '../../models/Nurse.js';

const SECRET_KEY = 'usersecret'; // Deve ser a mesma chave usada para criar o token

const getNurseByToken = async (token) => {
    if (!token) {
        throw new Error('Token não fornecido');
    }

    // Verifica e decodifica o token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Busca a enfermeira no banco de dados
    const nurse = await Nurse.findByPk(decoded.id);

    if (!nurse) {
        throw new Error('Enfermeira não encontrada');
    }

    return nurse;
};

export default getNurseByToken;
