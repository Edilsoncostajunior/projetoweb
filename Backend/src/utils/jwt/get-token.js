const getToken = (req) => {
    const authHeader = req.headers.authorization;

    // Verifica se o header de autorização existe
    if (!authHeader) {
        throw new Error("Autorização inexistente!");
    }

    // Retorna o token (ignora a palavra 'Bearer')
    return authHeader.split(' ')[1];
};

export default getToken;
