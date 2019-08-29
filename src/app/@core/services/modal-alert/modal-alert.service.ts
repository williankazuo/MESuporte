import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalAlert } from '../../models/modal-alert/modal-alert.model';

@Injectable({
    providedIn: 'root'
})
export class ModalAlertService {
    private openAlertSource = new BehaviorSubject(false);
    public $openAlert = this.openAlertSource.asObservable();
    private alertConfigSource = new BehaviorSubject(new ModalAlert());
    public $alertConfig = this.alertConfigSource.asObservable();

    constructor() { }

    /**
     * Método responsável por abrir o modal de alerta.
     */
    public openAlertModal() {
        this.openAlertSource.next(true);
    }

    /**
     * Método respnosável por fechar o modal de alerta.
     */
    public closeAlertModal() {
        this.openAlertSource.next(false);
    }

    /**
     * Método responsável por setar a configuração do modal de alerta.
     * @param alertConfig modelo de alerta.
     */
    public setAlertConfiguration(alertConfig: ModalAlert) {
        this.alertConfigSource.next(alertConfig);
    }
}