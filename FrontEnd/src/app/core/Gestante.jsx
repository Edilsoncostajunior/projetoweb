export default class Gestante {
    #id;
    #nome;
    #idade;
    #email;
    #dataUltimaMenstruacao;
    #paridade;
    #dataProvavelParto;
    #idadeGestacional;
    #comorbidades;
    #alergias;


    constructor(id = null, nome, idade,email, dataUltimaMenstruacao, paridade, dataProvavelParto, idadeGestacional, comorbidades, alergias) {
        this.#id = id;
        this.#nome = nome;
        this.#idade = idade;
        this.#email = email;
        this.#dataUltimaMenstruacao = dataUltimaMenstruacao;
        this.#paridade = paridade;
        this.#dataProvavelParto = dataProvavelParto;
        this.#idadeGestacional = idadeGestacional;
        this.#comorbidades = comorbidades;
        this.#alergias = alergias;
    }

    static vazio() {
        return new Gestante(null, '', 0, null, null, null, null, null, null);
    }

    get id() {
        return this.#id;
    }

    get nome() {
        return this.#nome;
    }

    get idade() {
        return this.#idade;
    }

    get dataUltimaMenstruacao() {
        return this.#dataUltimaMenstruacao;
    }

    get email(){
        return this.#email;
    }

    get paridade() {
        return this.#paridade;
    }

    get dataProvavelParto() {
        return this.#dataProvavelParto;
    }

    get idadeGestacional() {
        return this.#idadeGestacional;
    }

    get comorbidades() {
        return this.#comorbidades;
    }

    get alergias() {
        return this.#alergias;
    }
}
