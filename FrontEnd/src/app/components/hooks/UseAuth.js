import api from "../utils/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const { setFlashMessage } = useFlashMessage();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            // Adiciona o token ao cabeçalho padrão da API
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }
    }, []);

    async function registerNurse(nurse) {
        let msgText = 'Cadastro de enfermeira realizado com sucesso!';
        let msgType = 'success';

        try {
            const data = await api.post('/nurse/register', nurse).then((response) => {
                return response.data;
            });

            // Autentica a enfermeira após o registro
            await authNurse(data);
        } catch (error) {
            msgText = error.response?.data?.message || 'Erro ao cadastrar enfermeira';
            msgType = 'error';
        }

        setFlashMessage(msgText, msgType);
    }

    async function authNurse(data) {
        setAuthenticated(true);
        // Salva o token no armazenamento local e define o cabeçalho padrão da API
        localStorage.setItem('token', JSON.stringify(data.token));
        api.defaults.headers.Authorization = `Bearer ${data.token}`;
        router.push('/home');
    }

    async function loginNurse(nurse) {
        let msgText = 'Login realizado com sucesso!';
        let msgType = 'success';

        try {
            const data = await api.post('/nurse/nurses/login', nurse).then((response) => {
                return response.data;
            });

            // Autentica a enfermeira após o login
            await authNurse(data);
        } catch (error) {
            msgText = error.response?.data?.message || 'Erro ao realizar login';
            msgType = 'error';
        }

        setFlashMessage(msgText, msgType);
    }

    async function fetchPatientData() {
        try {
            const response = await api.get('/patient/data');
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar dados do paciente", error);
        }
    }

    function logout() {
        let msgText = 'Logout realizado com sucesso!';
        let msgType = 'success';

        setAuthenticated(false);
        // Remove o token do armazenamento local e dos cabeçalhos padrão da API
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = undefined;
        router.push('/');

        setFlashMessage(msgText, msgType);
    }

    return { authenticated, registerNurse, loginNurse, logout, fetchPatientData };
}
