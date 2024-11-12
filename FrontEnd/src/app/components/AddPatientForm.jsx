import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPatientForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthDate: "",
    parity: 0,
    age: "",
    lastMenstrualDate: "",
    email: "",
    observations: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/patient/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Paciente adicionado com sucesso!");
        setFormData({
          name: "",
          phone: "",
          birthDate: "",
          parity: 0,
          age: "",
          lastMenstrualDate: "",
          email: "",
          observations: ""
        });
      } else {
        alert("Erro ao adicionar paciente.");
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  const handleCancel = () => {
    router.push("/home"); // Redireciona para a URL /home
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mt-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Nome do paciente</label>
            <input
              type="text"
              name="name"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Nome do paciente"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Telefone</label>
            <input
              type="text"
              name="phone"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Telefone"
              value={formData.phone}
              onChange={handleInputChange}
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Paridade</label>
            <input
              type="number"
              name="parity"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Paridade"
              value={formData.parity}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Idade Gestacional</label>
            <input
              type="text"
              name="age"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Idade Gestacional"
              value={formData.age}
              onChange={handleInputChange}
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
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Email da Paciente</label>
          <input
            type="email"
            name="email"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Email da Paciente"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Observações</label>
          <textarea
            name="observations"
            className="mt-1 p-2 w-full border rounded-md"
            rows="4"
            placeholder="Observações"
            value={formData.observations}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border rounded-md bg-purple-100 text-purple-700"
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button type="submit" className="px-4 py-2 border rounded-md bg-purple-500 text-white">
            + Add Paciente
          </button>
        </div>
      </form>
    </div>
  );
}
