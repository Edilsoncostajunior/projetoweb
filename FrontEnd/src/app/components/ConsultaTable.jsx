// components/ConsultaTable.js
import React, { useEffect, useState } from 'react';
import ConsultaRow from './ConsultaRow';

export default function ConsultaTable({ apiUrl }) {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    // Função para buscar as consultas da API
    const fetchConsultas = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setConsultas(data);
      } catch (error) {
        console.error("Erro ao buscar consultas:", error);
      }
    };

    fetchConsultas();
  }, [apiUrl]);

  console.log(consultas[3])

  return (
    <div className="mt-4 bg-white shadow-md rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-600">
            <th className="p-4">Nome do Paciente</th>
            <th className="p-4">Observações</th>
            <th className="p-4">Data da Consulta</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map((consulta, index) => (
            <ConsultaRow key={index} consulta={consulta} />
          ))}

        </tbody>
      </table>
    </div>
  );
}
