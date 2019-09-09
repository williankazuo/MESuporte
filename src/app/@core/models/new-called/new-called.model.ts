import { FileModel } from '../upload/upload.model';

/**
 * Model para o campo de observação e assuntos relacionados ao chamado
 */
export class ObservationModel {
    text: string;
    titles: Array<SubjectModel>;

    constructor() {
        this.text = '';
        this.titles = new Array<SubjectModel>();
    }
}

/**
 * Model de envio para o backend, relacionado ao crud de chamados
 */
export class CalledModel {
    idClerk: string;
    idChat: number;
    idStatus: number;
    nameClerk: string;
    namePatient: string;
    type: string;
    medicalRecord: string;
    observation: ObservationModel;
    id: number;

    constructor() {
        this.idClerk = '';
        this.idChat = 0;
        this.idStatus = 0;
        this.nameClerk = '';
        this.namePatient = '';
        this.type = '';
        this.medicalRecord = '';
        this.observation = new ObservationModel();
        this.id = 0;
    }
}

/**
 * Model para os assuntos do chamado
 */
export class SubjectModel {
    descTitle: string;
    isOther: boolean;
    id: number;

    constructor() {
        this.descTitle = '';
        this.isOther = false;
        this.id = 0;
    }
}

/**
 * Model para o upload de imagens
 */
export class UploadModel {
    idCalled: number;
    images: Array<FileModel>;

    constructor() {
        this.idCalled = 0;
        this.images = new Array<FileModel>();
    }
}

