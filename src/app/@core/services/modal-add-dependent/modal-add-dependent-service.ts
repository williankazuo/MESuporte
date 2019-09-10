import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OpenAddDependentModel } from '../../models/dependent/open-add-dependent.model';
import { UserRegistrationModel } from '../../models/form-registration-data/user-form.model';

@Injectable({
    providedIn: 'root'
})
export class ModalAddDependentService {
    private openAlertSource = new BehaviorSubject(new OpenAddDependentModel());
    public $openAlert = this.openAlertSource.asObservable();

    constructor() { }

    /**
     * Método responsável por abrir o modal de alerta.
     */
    public openModaAddDependent(idTabelaTitular: string, patient: UserRegistrationModel) {
        const openAdd = new OpenAddDependentModel();
        openAdd.idTabelaTitular = idTabelaTitular;
        openAdd.open = true;
        openAdd.patient = patient;
        this.openAlertSource.next(openAdd);
    }

    /**
     * Método respnosável por fechar o modal de alerta.
     */
    public closeModalAddDependent() {
        const openAdd = new OpenAddDependentModel();
        openAdd.open = false;
        this.openAlertSource.next(openAdd);
    }
}
