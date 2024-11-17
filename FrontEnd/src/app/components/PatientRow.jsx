import React, { useState, useEffect } from 'react';

export default function PatientRow({ patient, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [gestationalAge, setgestationalAge] = useState('');

  const calculateGestationalAge = (dataUltimaMenstruacao) => {
    const dumDate = new Date(dataUltimaMenstruacao);
    const currentDate = new Date();
    const differenceInMs = currentDate - dumDate;
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(differenceInDays / 7);
    const days = differenceInDays % 7;
    return `${weeks} semanas e ${days} dias`;
  };

  const calculateDueDate = (dataUltimaMenstruacao) => {
    const dumDate = new Date(dataUltimaMenstruacao);
    const dueDate = new Date(dumDate.setDate(dumDate.getDate() + 280));
    return dueDate.toLocaleDateString('pt-BR');
  };

  useEffect(() => {
    if (patient.dataUltimaMenstruacao) {
      const gestationalAge = calculateGestationalAge(patient.dataUltimaMenstruacao);
      const dueDate = calculateDueDate(patient.dataUltimaMenstruacao);
      setDueDate(dueDate);
      setgestationalAge(gestationalAge);
    }
  }, [patient.dataUltimaMenstruacao]);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');

      await fetch(`http://localhost:5000/patient/patients/${patient.id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${JSON.parse(token)}`,
        },
      });

      onDelete(patient.id); // Remove o paciente da lista sem recarregar a página
      setShowConfirm(false);
    } catch (error) {
      console.error('Erro ao deletar paciente:', error);
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">{patient.name}</td>
      <td className="p-4">{gestationalAge}</td>
      <td className="p-4">{patient.phone}</td>
      <td className="p-4">{patient.email}</td>
      <td className="p-4">{dueDate}</td>
      <td className="p-4 flex space-x-4">
        <a
          href={`/patient/${patient.id}`}
          className="text-blue-600 hover:underline"
        >
          Editar
        </a>
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
