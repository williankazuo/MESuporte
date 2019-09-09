import { Injectable } from '@angular/core';
import { UserModel } from '../../models/login/user.model';
import { UserRegistrationModel } from '../../models/form-registration-data/user-form.model';
import { CalledModel, ObservationModel } from '../../models/new-called/new-called.model';
import { CallStatus } from '../../enums/ended-calls/call-status.enum';
import { CallType } from '../../consts/ended-calls/callType.const';
import { CalledService } from './called.service';

@Injectable()
export class CallActionService {
    public idCall = 0;

    constructor(
        private _calledService: CalledService
    ) { }

    /**
     * Método responsável por buscar o id do chamado.
     */
    public getIdCall(): number {
        return this.idCall;
    }

    /**
     * Método resoponsável por setar o id do chamado.
     * @param id id do chamado.
     */
    public setIdCall(id: number): void {
        this.idCall = id;
    }

    /**
     * Método responsável por verificar se já existe um chamado criado para 
     * @param currentUser Usuário logado
     * @param patient Paciente pesquisado
     * @param observation Observação
     */
    public checkCall(currentUser: UserModel, patient: UserRegistrationModel, observation: ObservationModel): void {
        if (this.idCall === 0) {
            const call = new CalledModel();
            call.nameClerk = currentUser.name;
            call.namePatient = patient.name;
            call.medicalRecord = patient.medicalRecord;
            call.idStatus = CallStatus.Open;
            call.type = CallType.Telefone;
            call.observation = observation;
            this._calledService.registerCalled(call).subscribe(response => {
                this.setIdCall(response.idCalled);
            }, error => {

            });
        } else {

        }
    }
}
