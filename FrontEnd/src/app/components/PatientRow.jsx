import React, { useState } from 'react';

export default function PatientRow({ patient, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:5000/patient/patients/${patient.id}`, {
        method: 'DELETE',
      });
      onDelete(patient.id); // Remove o paciente da lista após deleção
      setShowConfirm(false);
    } catch (error) {
      console.error('Erro ao deletar paciente:', error);
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">{patient.name}</td>
      <td className="p-4">{patient.gestationalAge}</td>
      <td className="p-4">{patient.phone}</td>
      <td className="p-4">{patient.email}</td>
      <td className="p-4">{patient.dueDate}</td>
      <td className="p-4 flex space-x-4">
        {/* Botão Editar */}
        <a
          href={`/patient/${patient.id}`}
          className="text-blue-600 hover:underline"
        >
          Editar
        </a>
        {/* Botão Deletar */}
        <button
          className="text-red-600 hover:underline"
          onClick={handleDeleteClick}
        >
          Deletar
        </button>
      </td>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p>Tem certeza que deseja deletar este paciente?</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={confirmDelete}
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
    </tr>
  );
}
