export class DependentUserMeuEinsteinModel {
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
    _sex: string;
    idTable: string;

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
        this.documentType = 'CPF';
        this.documentNumber = '';
        this.sex = 0;
        this.profileId = '';
        this._sex = '';
        this.idTable = '';
    }
}

export class UserRegistrationModel {
    id: string;
    birthDate: string;
    mail: string;
    name: string;
    lastName: string;
    fullName: string;
    documentType: string;
    documentNumber: string;
    phoneNumber: string;
    dependents: Array<DependentUserMeuEinsteinModel>;
    gender: string;
    zipCode: string;
    state: string;
    city: string;
    district: string;
    address: string;
    addressNumber: string;
    medicalRecord: string;
    addressComplement: string;
    passport: string;
    vip: boolean;
    idTable: number;
    descStatusSocial: string;

    constructor() {
        this.id = '';
        this.birthDate = '';
        this.mail = '';
        this.name = '';
        this.lastName = '';
        this.fullName = '';
        this.documentType = 'CPF';
        this.documentNumber = '';
        this.phoneNumber = '';
        this.dependents = new Array<DependentUserMeuEinsteinModel>();
        this.gender = '';
        this.zipCode = '';
        this.state = '';
        this.city = '';
        this.district = '';
        this.address = '';
        this.addressNumber = '';
        this.medicalRecord = '';
        this.addressComplement = '';
        this.passport = '';
        this.vip = false;
        this.idTable = 0;
        this.descStatusSocial = '';
    }
}
