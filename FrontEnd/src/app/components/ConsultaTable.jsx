import React, { useEffect, useState } from 'react';
import ConsultaRow from './ConsultaRow';
import ConsultaModal from './ConsultaModal'; // Importa o componente de modal

export default function ConsultaTable({ apiUrl }) {
  const [consultas, setConsultas] = useState([]);
  const [selectedConsulta, setSelectedConsulta] = useState(null); // Estado para consulta selecionada
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade do modal

  useEffect(() => {
    // Função para buscar as consultas da API
    const fetchConsultas = async () => {
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
          setConsultas(data);
        } else {
          console.error("Token não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar consultas:", error);
      }
    };

    fetchConsultas();
  }, [apiUrl]);

  // Função para abrir o modal com a consulta selecionada
  const handleRowClick = (consulta) => {
    setSelectedConsulta(consulta);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedConsulta(null);
  };

  const handleDelete = (id) => {
    setConsultas(prevConsulta => prevConsulta.filter(consulta => consulta.id !== id));
  };

  

  return (
    <div className="mt-4 bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-600">
            <th className="p-4">Nome do Paciente</th>
            <th className="p-4">Observações</th>
            <th className="p-4">Data da Consulta</th>
            <th className="p-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map((consulta, index) => (
            <ConsultaRow
              key={index}
              consulta={consulta}
              onRowClick={handleRowClick} // Passa a função de clique para cada linha
              onDelete={handleDelete} // Passa a função de deleção para cada linha
            />
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <ConsultaModal
          consulta={selectedConsulta}
          onClose={handleCloseModal} // Função para fechar o modal
        />
      )}
    </div>
  );
}
