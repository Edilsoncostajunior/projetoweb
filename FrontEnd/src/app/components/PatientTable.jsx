import React, { useEffect, useState } from 'react';
import PatientRow from "./PatientRow";

// components/PatientList.js
export default function PatientList({apiUrl}) {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
      // Função para buscar as Patients da API
      const fetchPatients = async () => {
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          setPatients(data);
        } catch (error) {
          console.error("Erro ao buscar Patients:", error);
        }
      };

      fetchPatients();
    }, [apiUrl]);

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
              <PatientRow key={index} patient={patient} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
