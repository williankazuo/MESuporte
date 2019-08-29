import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserRegistrationModel } from 'src/app/@core/models/form-registration-data/user-form.model';
import { PatientDataService } from 'src/app/@core/services/patient-data/patient-data.service';
import { SearchType } from 'src/app/@core/consts/searchType/searchType.const';
import { ModalAlert } from 'src/app/@core/models/modal-alert/modal-alert.model';
import { ModalAlertService } from 'src/app/@core/services/modal-alert/modal-alert.service';

@Component({
  selector: 'app-form-registration-data',
  templateUrl: './form-registration-data.component.html',
  styleUrls: ['./form-registration-data.component.scss']
})
export class FormRegistrationDataComponent implements OnInit {
  @Output() receiveMEData = new EventEmitter();
  @Output() receiveSGHData = new EventEmitter();

  public sghUser = new UserRegistrationModel();
  public meUser = new UserRegistrationModel();

  constructor(
    private _patientDataService: PatientDataService,
    private _modalAlertService: ModalAlertService
  ) {

  }

  ngOnInit() {
    this._patientDataService.emitterSearch.subscribe(data => {
      if (data[0] === SearchType.cpf) {
        this.getPatientDataByCPF(data[1]);
      } else if (data[0] === SearchType.passaporte) {
        // this.getPatientDataByDocument();
      } else {
        this.getPatientDataByMedicalRecord(data[1]);
      }
    });
  }

  /**
   * Método responsável por buscar os dados do paciente por CPF.
   * @param cpf CPF do paciente.
   */
  private getPatientDataByCPF(cpf: string) {
    this._patientDataService.getByDocumentME(cpf).subscribe(response => {
      this.meUser = this.formatData(response);
      this.receiveMEData.emit(this.meUser);
    }, error => {
      this.openNotFound();
    });
    // this._patientDataService.getByDocumentSGH(cpf).subscribe(response => {
    //   this.sghUser = this.formatData(response);
    //   this.receiveSGHData.emit(this.sghUser);
    // }, error => {
    //   this.openNotFound();
    // });
  }

  /**
   * Método responsável por buscar os dados do paciente pelo prontuário.
   * @param medicalRecord Prontuário do paciente.
   */
  private getPatientDataByMedicalRecord(medicalRecord: string) {
    this._patientDataService.getByMedicalRecordME(medicalRecord).subscribe(response => {
      this.meUser = this.formatData(response);
      this.receiveMEData.emit(this.meUser);
    }, error => {
      this.openNotFound();
    });
    // this._patientDataService.getByMedicalRecordSGH(medicalRecord).subscribe(response => {
    //   this.sghUser = this.formatData(response);
    //   this.receiveSGHData.emit(this.sghUser)
    // }, error => {
    //   this.openNotFound();
    // });
  }

  /**
   * Método responsável por formatar os dados e exibilos de forma correta.
   * @param userData Dados do usuário
   */
  private formatData(userData: UserRegistrationModel) {
    userData.birthDate = new Date(userData.birthDate).toLocaleDateString();
    if (userData.medicalRecord && userData.medicalRecord === '0') {
      userData.medicalRecord = '';
    }
    return userData;
  }

  /**
   * Método responsável por reverter os dados que foram convertidos para exibição.
   * É necessário reverter pois o backend aceita outro formato. 
   * @param userData Dados do usuário.
   */
  private revertData(userData: UserRegistrationModel) {
    userData.name = userData.fullName;
    userData.lastName = '';
    const dates = userData.birthDate.split('/');
    userData.birthDate = `${dates[2]}-${dates[1]}-${dates[0]}T00:00:00`;
    return userData;
  }

  /**
   * Método responsável por emitir os valores do formulário.
   */
  public emitUserData() {
    this.meUser = this.revertData(this.meUser);
    this.sghUser = this.revertData(this.sghUser);
    this.receiveMEData.emit(this.meUser);
    this.receiveSGHData.emit(this.sghUser);
  }

  /**
   * Método responsável por configurar o que vai ser exibido no modal de alerta.
   */
  private configureModal() {
    const alertConfig = new ModalAlert();
    alertConfig.title = 'Aviso';
    alertConfig.button1Text = 'OK';
    alertConfig.button1Action = () => {
      this._modalAlertService.closeAlertModal();
    };
    alertConfig.text = 'Paciente não encontrado.';
    this._modalAlertService.setAlertConfiguration(alertConfig);
  }

  /**
   * Método responsável por configurar o modal, abrir o modal e limpar os campos do formulário.
   */
  private openNotFound() {
    this.configureModal();
    this._modalAlertService.openAlertModal();
  }
}
