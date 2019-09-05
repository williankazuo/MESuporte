export class NewDependentModel {
    dependentId: string;
    userId: string;
    userFatherId: string;
    lastAuth: string;
    patientIdentifier: string;
    birthDate: string;
    mail: string;
    name: string;
    nameMother: string;
    documentType: string;
    documentNumber: string;
    sex: number;
    profileId: string;
    passport: string;
    idTable: number;
    idTableHolder: number;

    constructor() {
        this.dependentId = '';
        this.userId = '';
        this.userFatherId = '';
        this.lastAuth = '';
        this.patientIdentifier = '';
        this.birthDate = '';
        this.mail = '';
        this.name = '';
        this.nameMother = '';
        this.documentType = '';
        this.documentNumber = '';
        this.sex = 0;
        this.profileId = '';
        this.passport = '';
        this.idTable = 0;
        this.idTableHolder = 0;
    }
}
