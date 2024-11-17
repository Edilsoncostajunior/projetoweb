"use client";
import React, { useState, useEffect } from "react";
import ConsultaTable from "./ConsultaTable";
import AddButton from "./AddButton";

export default function PatientList({ params, apiUrl }) {
  const id = params.id; // Obtém o ID da rota

  const [activeTab, setActiveTab] = useState("dados");
  const [isEditing, setIsEditing] = useState(false);
  const [GestationalAge, setGestationalAge] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    GestationalAge: "",
    birthDate: "",
    parity: 0,
    lastMenstrualDate: "",
    observations: "",
  });
  const [consultaData, setConsultaData] = useState({
    dataConsulta: "",
    anotacao: ""
  });

  const calculateGestationalAge = (dataUltimaMenstruacao) => {
    const dumDate = new Date(dataUltimaMenstruacao);
    const currentDate = new Date();

    const differenceInMs = currentDate - dumDate;
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(differenceInDays / 7);
    const days = differenceInDays % 7;

    return `${weeks} semanas e ${days} dias`;
  };

  useEffect(() => {
    if (id) {
      fetch(`${apiUrl}/${id}`)
        .then((response) => response.json())
        .then((data) => setFormData(data))
        .catch((error) => console.error("Erro ao buscar os dados do paciente:", error));
    }
  }, [id]);

  useEffect(() => {
    if (formData.dataUltimaMenstruacao) {
      const GestationalAge = calculateGestationalAge(formData.dataUltimaMenstruacao);
      setGestationalAge(GestationalAge);
    }
  }, [formData.dataUltimaMenstruacao]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConsultaChange = (e) => {
    const { name, value } = e.target;
    setConsultaData({ ...consultaData, [name]: value });
  };

  const handleAddConsulta = async () => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:5000/consulta/consultas/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${JSON.parse(token)}`, // Passando o token no cabeçalho
        },
        body: JSON.stringify(consultaData),
      });
      alert('Consulta adicionada com sucesso!');
      setActiveTab('consultas'); // Volta para a aba de consultas após adicionar
    } catch (error) {
      console.error("Erro ao adicionar a consulta:", error);
    }
  };

  const handleEditSave = async () => {
    if (isEditing) {
      const token = localStorage.getItem('token');
      try {
        await fetch(`http://localhost:5000/patient/patients/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${JSON.parse(token)}`, // Passando o token no cabeçalho
          },
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
          className={`px-4 py-2 rounded-lg ${activeTab === "dados" ? "bg-gray-300 font-bold text-black" : "text-gray-400"
            }`}
        >
          Dados do Paciente
        </button>
        <button
          onClick={() => setActiveTab("consultas")}
          className={`px-4 py-2 rounded-lg ${activeTab === "consultas" ? "bg-gray-300 font-bold text-black" : "text-gray-400"
            }`}
        >
          Consultas
        </button>
        <div>
          <button
            onClick={() => setActiveTab("addconsulta")}
            className={`px-4 py-2 rounded-lg ${activeTab === "addconsulta" ? "bg-gray-300 font-bold text-black" : "text-gray-400"
              }`}
          >
            Adicionar consulta
          </button>
        </div>
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
                name="paridade"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.paridade}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Idade Gestacional</label>
              <input
                type="text"
                name="idadeGestacional"
                className="mt-1 p-2 w-full border rounded-md"
                value={GestationalAge}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Data da Última Menstruação</label>
              <input
                type="date"
                name="dataUltimaMenstruacao"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.dataUltimaMenstruacao}
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
              className={`px-4 py-2 border rounded-md ${isEditing ? "bg-green-500 text-white" : "bg-purple-500 text-white"
                }`}
              onClick={handleEditSave}
            >
              {isEditing ? "Salvar" : "Editar"}
            </button>
          </div>
        </div>
      ) : activeTab === "consultas" ? (
        <div>
          <ConsultaTable apiUrl={`http://localhost:5000/consulta/consultas/paciente/${id}`} />
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Adicionar Nova Consulta</h2>
          <div>
            <label className="block text-sm font-medium">Data da Consulta</label>
            <input
              type="date"
              name="dataConsulta"
              className="mt-1 p-2 w-full border rounded-md"
              value={consultaData.dataConsulta }
              onChange={handleConsultaChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Observações</label>
            <textarea
              name="anotacao"
              className="mt-1 p-2 w-full border rounded-md"
              value={consultaData.anotacao}
              onChange={handleConsultaChange}
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 mt-4 bg-green-500 text-white rounded-md"
            onClick={handleAddConsulta}
          >
            Adicionar Consulta
          </button>
        </div>
      )}
    </div>
  );
}
