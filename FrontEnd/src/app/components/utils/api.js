import axios from 'axios';

// Configuração da instância do Axios
const api = axios.create({
  baseURL: 'http://localhost:5000', // Ajuste conforme necessário
});

// Middleware para adicionar o token JWT no cabeçalho de cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
