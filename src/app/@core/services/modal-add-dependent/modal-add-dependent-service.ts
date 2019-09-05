import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OpenAddDependentModel } from '../../models/dependent/open-add-dependent.model';

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
    public openModaAddDependent(idTabelaTitular: string) {
        const openAdd = new OpenAddDependentModel();
        openAdd.idTabelaTitular = idTabelaTitular;
        openAdd.open = true;
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
