import jwt from 'jsonwebtoken';

// Substitua 'YOUR_SECRET_KEY' pela chave secreta que você deseja usar
const SECRET_KEY = 'usersecret';
const EXPIRATION_TIME = '1h'; // O token expira em 1 hora

const createUserToken = (nurse, req, res) => {
    // Cria o token com os dados da enfermeira
    const token = jwt.sign({ id: nurse.id }, SECRET_KEY, { expiresIn: EXPIRATION_TIME });

    // Define o token no header da resposta
    res.header('Authorization', `Bearer ${token}`);
    res.status(200).json({ message: 'Login bem-sucedido', token });
};

export default createUserToken;
