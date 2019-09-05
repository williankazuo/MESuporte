export class ListDependent {
    descNacionalidade: string;
    descSexo: string;
    nomePessoa: string;
    numCPF: string;
    numPassaporte: string;
    numProntuario: string;
    dataNascimento: string;
    idTabela: number;

    constructor() {
        this.descNacionalidade = '';
        this.descSexo = '';
        this.nomePessoa = '';
        this.numCPF = '';
        this.numPassaporte = '';
        this.numProntuario = '';
        this.dataNascimento = '';
        this.idTabela = 0;
    }
}

export class ListDependentArray {
    objeto: Array<ListDependent>;

    constructor() {
        this.objeto = new Array<ListDependent>();
    }
}
