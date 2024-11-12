// components/ConsultaRow.js
export default function ConsultaRow({ consulta }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">{consulta.patient ? consulta.patient.name : 'N/A'}</td>
      <td className="p-4">{consulta.anotacao}</td>
      <td className="p-4">{new Date(consulta.dataConsulta).toLocaleDateString()}</td>
    </tr>
  );
}
