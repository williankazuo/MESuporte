import { UserRegistrationModel } from '../form-registration-data/user-form.model';

export class OpenAddDependentModel {
    open: boolean;
    idTabelaTitular: string;
    patient: UserRegistrationModel;

    constructor() {
        this.open = false;
        this.idTabelaTitular = '';
        this.patient = new UserRegistrationModel();
    }
}