import React, { useEffect, useState } from 'react';
import PatientRow from "./PatientRow";

// components/PatientList.js
export default function PatientList({ apiUrl }) {
    const [patients, setPatients] = useState([]);

    const fetchPatients = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await fetch(apiUrl, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(token)}`,
                    },
                });

                const data = await response.json();
                setPatients(data);
            } else {
                console.error("Token não encontrado!");
            }
        } catch (error) {
            console.error("Erro ao buscar Patients:", error);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, [apiUrl]);

    // Função para remover um paciente da lista após a deleção
    const handleDelete = (deletedPatientId) => {
        setPatients(prevPatients =>
            prevPatients.filter(patient => patient.id !== deletedPatientId)
        );
    };

    return (
        <div className="mt-4 bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full text-left">
                <thead>
                    <tr className="text-gray-600">
                        <th className="px-4 py-2 text-left font-medium text-sm">Nome do Paciente</th>
                        <th className="px-4 py-2 text-left font-medium text-sm">Idade Gestacional</th>
                        <th className="px-4 py-2 text-left font-medium text-sm">Celular</th>
                        <th className="px-4 py-2 text-left font-medium text-sm">Email</th>
                        <th className="px-4 py-2 text-left font-medium text-sm">Data provável parto</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient, index) => (
                        <PatientRow key={index} patient={patient} onDelete={handleDelete} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
