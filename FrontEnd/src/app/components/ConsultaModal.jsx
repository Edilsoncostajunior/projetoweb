import React from 'react';

export default function ConsultaModal({ consulta, onClose }) {
  if (!consulta) return null;

  const adjustedDate = new Date(consulta.dataConsulta);
  adjustedDate.setDate(adjustedDate.getDate() + 1);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Detalhes da Consulta</h2>
        <p><strong>Nome do Paciente:</strong> {consulta.patient ? consulta.patient.name : 'N/A'}</p>
        <p><strong>Observações:</strong> {consulta.anotacao}</p>
        <p><strong>Data da Consulta:</strong> {adjustedDate.toLocaleDateString()}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
