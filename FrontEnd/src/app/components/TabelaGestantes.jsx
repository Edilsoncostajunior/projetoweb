import Gestante from "../core/Gestante";

class TabelaGestantes {
  constructor(props) {
    this.props = props;
    this.exibirAcoes = props.gestanteSelecionado || props.gestanteExcluido;
  }

  renderizarCabecalho() {
    return `
      <tr>
        <th class="text-left p-4">Nome</th>
        <th class="text-left p-4">Idade</th>
        <th class="text-left p-4">Idade Gestacional</th>
        <th class="text-left p-4">Data Provável de Parto</th>
        ${this.exibirAcoes ? `<th class="p-4">Ações</th>` : ''}
      </tr>
    `;
  }

  renderizarDados() {
    return this.props.gestantes.map((gestante, i) => {
      return `
        <tr key=${gestante.id} class="${i % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}">
          <td class="text-left p-4">${gestante.nome}</td>
          <td class="text-left p-4">${gestante.idade}</td>
          <td class="text-left p-4">${gestante.idadeGestacional}</td>
          <td class="text-left p-4">${gestante.dataProvavelParto}</td>
          ${this.exibirAcoes ? this.renderizarAcoes(gestante) : ''}
        </tr>
      `;
    }).join('');
  }

  renderizarAcoes(gestante) {
    return `
      <td class="flex justify-center">
        ${this.props.gestanteSelecionado ? `
          <button onclick="(${this.props.gestanteSelecionado.toString()})('${gestante.id}')" class="flex justify-center items-center text-green-600 rounded-full p-2 m-1 hover:bg-purple-50">
            Editar
          </button>
        ` : ''}
        ${this.props.gestanteExcluido ? `
          <button onclick="(${this.props.gestanteExcluido.toString()})('${gestante.id}')" class="flex justify-center items-center text-red-500 rounded-full p-2 m-1 hover:bg-purple-50">
            Excluir
          </button>
        ` : ''}
      </td>
    `;
  }

  render() {
    return `
      <table class="w-full rounded-xl overflow-hidden">
        <thead class="text-black-100 bg-gradient-to-r from-gray-400 to-gray-400">
          ${this.renderizarCabecalho()}
        </thead>
        <tbody>
          ${this.renderizarDados()}
        </tbody>
      </table>
    `;
  }
}

export default TabelaGestantes;
