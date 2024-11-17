import React, { useState } from 'react';

export default function ConsultaRow({ consulta, onRowClick, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  // Corrige a data adicionando um dia
  const adjustedDate = new Date(consulta.dataConsulta);
  adjustedDate.setDate(adjustedDate.getDate() + 1);

  // Função para limitar o texto das observações a um máximo de 100 caracteres
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  // Função para deletar consulta
  const handleDelete = async (e) => {
    e.stopPropagation(); // Impede a propagação do clique para a linha
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/consulta/consultas/${consulta.id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${JSON.parse(token)}`,
        },
      });
      onDelete(consulta.id); // Remove a consulta da lista sem recarregar a página
      setShowConfirm(false);
    } catch (error) {
      console.error('Erro ao deletar consulta:', error);
    }
  };

  // Função para exibir o modal de confirmação de deleção
  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Impede a propagação do clique para a linha
    setShowConfirm(true); // Exibe o modal de confirmação
  };

  // Verifica se o nome do paciente é N/A e, se for, não exibe a linha
  if (!consulta.patient || consulta.patient.name === 'N/A') {
    return null;
  }

  return (
    <>
      <tr
        className="border-b hover:bg-gray-50 cursor-pointer"
        onClick={() => onRowClick(consulta)} // Chama a função ao clicar na linha
      >
        <td className="p-4">{consulta.patient.name}</td>
        <td className="p-4">{truncateText(consulta.anotacao, 100)}</td>
        <td className="p-4">{adjustedDate.toLocaleDateString()}</td>
        <td className="p-4">
          <button
            className="text-red-600 hover:underline"
            onClick={handleDeleteClick} // Chama a função de deleção ao clicar no botão
          >
            Deletar
          </button>
        </td>
      </tr>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p>Tem certeza que deseja deletar esta consulta?</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Sim
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
