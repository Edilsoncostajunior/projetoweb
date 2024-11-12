"use client";
import React, { useState, useEffect } from "react";
import ConsultaTable from "./ConsultaTable";

export default function PatientList({ params, apiUrl }) {
  const id = params.id; // Obtém o ID da rota

  const [activeTab, setActiveTab] = useState("dados");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    dueDate: "",
    birthDate: "",
    parity: 0,
    lastMenstrualDate: "",
    observations: "",
  });

  // Carrega os dados do paciente ao carregar a página
  useEffect(() => {
    if (id) {
      fetch(`${apiUrl}/${id}`)
        .then((response) => response.json())
        .then((data) => setFormData(data))
        .catch((error) => console.error("Erro ao buscar os dados do paciente:", error));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditSave = async () => {
    if (isEditing) {
      try {
        await fetch(`/patients/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } catch (error) {
        console.error("Erro ao atualizar os dados:", error);
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="mt-4 bg-white shadow-md rounded-lg overflow-hidden p-6">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("dados")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "dados" ? "bg-gray-300 font-bold text-black" : "text-gray-400"
          }`}
        >
          Dados do Paciente
        </button>
        <button
          onClick={() => setActiveTab("consultas")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "consultas" ? "bg-gray-300 font-bold text-black" : "text-gray-400"
          }`}
        >
          Consultas
        </button>
      </div>

      {activeTab === "dados" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Nome do paciente</label>
              <input
                type="text"
                name="name"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Telefone</label>
              <input
                type="text"
                name="phone"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Data de Nascimento</label>
              <input
                type="date"
                name="birthDate"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.birthDate}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Paridade</label>
              <input
                type="number"
                name="parity"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.parity}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Idade Gestacional</label>
              <input
                type="text"
                name="age"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.age}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Data da Última Menstruação</label>
              <input
                type="date"
                name="lastMenstrualDate"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.lastMenstrualDate}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Email da Paciente</label>
            <input
              type="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Observações</label>
            <textarea
              name="observations"
              className="mt-1 p-2 w-full border rounded-md"
              rows="4"
              value={formData.observations}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 border rounded-md bg-purple-100 text-purple-700"
              onClick={() => setIsEditing(false)}
              disabled={!isEditing}
            >
              Cancelar
            </button>
            <button
              type="button"
              className={`px-4 py-2 border rounded-md ${
                isEditing ? "bg-green-500 text-white" : "bg-purple-500 text-white"
              }`}
              onClick={handleEditSave}
            >
              {isEditing ? "Salvar" : "Editar"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <ConsultaTable apiUrl={`http://localhost:5000/consulta/consultas/paciente/${id}`}  />
        </div>
      )}
    </div>
  );
}
