import { Component, OnInit, Output, EventEmitter, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { UserRegistrationModel } from 'src/app/@core/models/form-registration-data/user-form.model';
import { PatientDataService } from 'src/app/@core/services/patient-data/patient-data.service';
import { SearchType } from 'src/app/@core/consts/searchType/searchType.const';
import { ModalAlert } from 'src/app/@core/models/modal-alert/modal-alert.model';
import { ModalAlertService } from 'src/app/@core/services/modal-alert/modal-alert.service';
import { GenderEnum, GenderEnumSIAF } from 'src/app/@core/enums/gender/gender.enum';
import { ModalDependentService } from 'src/app/@core/services/modal-dependent/modal-dependent.service';
import { GenderSiaf } from 'src/app/@core/consts/gender/gender-siaf.const';
import { GenderME } from 'src/app/@core/consts/gender/gender-me.const';
import { CalledService } from 'src/app/@core/services/called/called.service';
import { CalledModel, ObservationModel, SubjectModel } from 'src/app/@core/models/new-called/new-called.model';
import { DateUtilService } from 'src/app/@core/services/utils/date.service';
import { CallActionService } from 'src/app/@core/services/called/call-action.service';
import { AuthenticationService } from 'src/app/@core/services/authentication/login.service';
import { UserModel } from 'src/app/@core/models/login/user.model';
import { AutomaticOBSUpdateData, AutomaticSubject } from 'src/app/@core/consts/observation/automatic-observation.const';

@Component({
  selector: 'app-form-registration-data',
  templateUrl: './form-registration-data.component.html',
  styleUrls: ['./form-registration-data.component.scss']
})
export class FormRegistrationDataComponent implements OnInit, AfterViewInit, OnDestroy {

  /** Propriedade para receber do componente pai as informações de um chamado */
  @Input()
  set receivedCalled(receivedCalled: CalledModel) {
    if (receivedCalled.medicalRecord && receivedCalled.namePatient) {
      this.disabled = true;
      this.getPatientDataByMedicalRecordSIAF(receivedCalled.medicalRecord);
    }
  }

  @Output() receiveMEData = new EventEmitter();
  @Output() receiveSIAFData = new EventEmitter();
  // tslint:disable-next-line: no-input-rename
  @Input('disableForm') disabled = false;

  public siafUser = new UserRegistrationModel();
  public meUser = new UserRegistrationModel();

  public activeButtonMeUser: boolean;
  public activeButtonSIAF: boolean;

  public siafGender = GenderSiaf;
  public meGender = GenderME;

  private unsubscribe: any;
  private currentUser: UserModel;

  constructor(
    private _patientDataService: PatientDataService,
    private _modalAlertService: ModalAlertService,
    private _modalDependentService: ModalDependentService,
    private _calledService: CalledService,
    private _dateUtilService: DateUtilService,
    private _callActionService: CallActionService,
    private _authenticationService: AuthenticationService
  ) {

  }

  ngOnInit() {
    this._patientDataService.emitterSearch.subscribe(data => {
      // Zerar o id do chamado, para toda pesquisa realizada. Pois ao pesquisar um novo paciente, um novo chamado deve ser registrado.
      this._callActionService.setIdCall(0);
      if (data[0] === SearchType.cpf) {
        this.getPatientDataByCPFSIAF(data[1]);
      } else if (data[0] === SearchType.passaporte) {
        // this.getPatientDataByDocument();
      } else {
        this.getPatientDataByMedicalRecordSIAF(data[1]);
      }
    });
    this.currentUser = this._authenticationService.getCurrentUser();
  }

  /**
   * Metodo Acionado apos a conclusão da exibição do componente, ativando a incrição do componente
   * para a que o mesmo saiba quando será necessário limpar/resetar os campos do formulário.
   */
  ngAfterViewInit() {
    this.unsubscribe = this._calledService.resetFormSubscriber.subscribe((context: boolean) => {
      if (context) {
        this.siafUser = new UserRegistrationModel();
        this.meUser = new UserRegistrationModel();
        this.activeButtonMeUser = false;
        this.activeButtonSIAF = false;
      }
    });
  }

  /**
   * Método responsável por buscar os dados do paciente por CPF no SIAF e fazer a chamada em seguida do Meu Einstein.
   * @param cpf CPF do paciente.
   */
  private getPatientDataByCPFSIAF(cpf: string): void {
    this.clearForm();
    this._patientDataService.getByDocumentSIAF(cpf).subscribe(response => {
      this.siafUser = this.formatData(response);
      this.receiveSIAFData.emit(this.siafUser);
      this.activeButtonSIAF = true;
      this.getPatientDataByCPFME(cpf, true);
    }, error => {
      this.activeButtonSIAF = false;
      this.getPatientDataByCPFME(cpf, false);
    });
  }

  /**
   * Método responsável por buscar os dados do paciente por CPF no Meu Einstein.
   * @param cpf CPF do paciente.
   */
  private getPatientDataByCPFME(cpf: string, foundSIAF: boolean): void {
    this._patientDataService.getByDocumentME(cpf).subscribe(response => {
      this.meUser = this.formatData(response);
      this.receiveMEData.emit(this.meUser);
      this.activeButtonMeUser = true;
      this.messageAndModal(true, foundSIAF);
    }, error => {
      this.messageAndModal(false, foundSIAF);
      this.activeButtonMeUser = false;
    });
  }



  /**
   * Método responsável por buscar os dados do paciente pelo prontuário no SIAF.
   * @param medicalRecord Prontuário do paciente.
   */
  private getPatientDataByMedicalRecordSIAF(medicalRecord: string): void {
    this.clearForm();
    this._patientDataService.getByMedicalRecordSIAF(medicalRecord).subscribe(response => {
      this.siafUser = this.formatData(response);
      this.receiveSIAFData.emit(this.siafUser);
      this.activeButtonSIAF = true;
      this.getPatientDataByMedicalRecordME(medicalRecord, true);
    }, error => {
      this.activeButtonSIAF = false;
      this.getPatientDataByMedicalRecordME(medicalRecord, false);
    });

  }

  /**
   * Método responsável por buscar os dados do paciente pelo prontuário no Meu Einstein.
   * @param medicalRecord Prontuário do paciente.
   */
  private getPatientDataByMedicalRecordME(medicalRecord: string, foundSIAF: boolean): void {
    this._patientDataService.getByMedicalRecordME(medicalRecord).subscribe(response => {
      this.meUser = this.formatData(response);
      this.receiveMEData.emit(this.meUser);
      this.activeButtonMeUser = true;
      this.messageAndModal(true, foundSIAF);
    }, error => {
      this.messageAndModal(false, foundSIAF);
      this.activeButtonMeUser = false;
    });
  }

  /**
   * Método responsável por exibir o modal de alerta caso não for encontrado pacientes.
   * Caso não tenha encontrado paciente nem no siaf e nem no meu einstein, irá exibir uma mensagem correspondente.
   * @param success Se houve sucesso na chamada.
   * @param foundSIAF Se encontrou algum paciente no SIAF.
   */
  private messageAndModal(success: boolean, foundSIAF: boolean): void {
    if (success) {
      if (!foundSIAF) {
        this.openNotFound('Paciente não encontrado no SIAF');
      }
    } else {
      const message = foundSIAF ? 'Paciente não encontrado no Meu Einstein.' : 'Paciente não encontrado no SIAF e no Meu Einstein.';
      this.openNotFound(message);
    }
  }


  /**
   * Método responsável por formatar os dados e exibilos de forma correta.
   * @param userData Dados do usuário
   */
  private formatData(userData: UserRegistrationModel): UserRegistrationModel {
    userData.birthDate = this._dateUtilService.convertShowDate(userData.birthDate);
    if (userData.medicalRecord && userData.medicalRecord === '0') {
      userData.medicalRecord = '';
    }
    if (userData.dependents && userData.dependents.length > 0) {
      userData.dependents.map(data => {
        data.sex = GenderEnum[data._sex];
        data.birthDate = this._dateUtilService.convertShowDate(data.birthDate);
      });
    }
    return userData;
  }

  /**
   * Método responsável por reverter os dados que foram convertidos para exibição.
   * É necessário reverter pois o backend aceita outro formato. 
   * @param userData Dados do usuário.
   */
  private revertData(userData: UserRegistrationModel): UserRegistrationModel {
    if (userData.fullName) {
      userData.name = userData.fullName;
      userData.lastName = '';
    }
    if (userData.birthDate) {
      const dates = userData.birthDate.split('/');
      userData.birthDate = `${dates[2]}-${dates[1]}-${dates[0]}T00:00:00`;
    }
    if (userData.phoneNumber) {
      userData.phoneNumber = userData.phoneNumber.replace(/[\D]/g, '');
    }
    return userData;
  }

  /**
   * Método responsável por emitir os valores do formulário.
   */
  public emitUserData(): void {
    this.meUser = this.revertData(this.meUser);
    this.siafUser = this.revertData(this.siafUser);

    this.receiveMEData.emit(this.meUser);
    this.receiveSIAFData.emit(this.siafUser);
  }

  // #region ----------------------- Upadate User ME/SIAF ---------------------
  /**
   * Metodo responsavel por atualizar os dados do paciente no SGH e MEU EINSTEIN
   */
  private updateDataPatientME(): void {
    let meUser = JSON.parse(JSON.stringify(this.meUser));
    meUser = this.revertData(meUser);
    this._patientDataService.updateDataME(meUser)
      .subscribe(response => {
        this.configureSuccess();
        this._modalAlertService.openAlertModal();
        this.checkCalls(meUser);
      }, error => {
        this.configureError(false);
        this._modalAlertService.openAlertModal();
      });
  }

  /**
   * Método responsável por atualizar os dados do paciente no SIAF.
   */
  public updateDataPatientSIAF(): void {
    let siafUser = JSON.parse(JSON.stringify(this.siafUser));
    siafUser = this.revertData(siafUser);
    siafUser.gender = GenderEnumSIAF[siafUser.gender];
    this._patientDataService.updateDataSIAF(siafUser)
      .subscribe(response => {
        this.configureSuccess();
        this._modalAlertService.openAlertModal();
        this.checkCalls(siafUser);
      }, error => {
        this.configureError(true);
        this._modalAlertService.openAlertModal();
      });
  }

  /**
   * Método responsável por configurar o modal de alerta de sucesso com imagem.
   */
  public configureSuccess(): void {
    const alertConfig = new ModalAlert();
    alertConfig.title = 'Dados atualizados com sucesso!';
    alertConfig.button1Text = 'OK';
    alertConfig.image = '../../../assets/images/modal-alert/icon_ok.png';
    alertConfig.button1Action = () => {
      this._modalAlertService.closeAlertModal();
    };
    this._modalAlertService.setAlertConfiguration(alertConfig);
  }

  /**
   * Método responsável por configurar o modal de alerta de erro com imagem. E tentar novamente chamando o método novamente.
   */
  public configureError(siaf: boolean): void {
    const alertConfig = new ModalAlert();
    alertConfig.title = 'Algo deu errado ao tentar atualizar os dados. Tente novamente.';
    alertConfig.button1Text = 'Tentar novamente';
    alertConfig.image = '../../../assets/images/modal-alert/icon_error.png';
    alertConfig.button1Action = () => {
      if (siaf) {
        this.updateDataPatientSIAF();
      } else {
        this.updateDataPatientME();
      }
    };
    this._modalAlertService.setAlertConfiguration(alertConfig);
  }

  // #endregion ----------------------- Upadate User ME ---------------------

  /**
   * Método responsável por configurar o modal, abrir o modal.
   */
  private openNotFound(message: string): void {
    this.configureModalNotFound(message);
    this._modalAlertService.openAlertModal();
  }

  /**
   * Método responsável por abrir o modal de incluir um dependente
   */
  public attachDependent(): void {
    this._modalDependentService.openModalDependent(this.siafUser.idTable.toString(), this.siafUser);
  }

  /**
   * Método responsável por configurar o que vai ser exibido no modal de alerta.
   */
  private configureModalNotFound(message: string): void {
    const alertConfig = new ModalAlert();
    alertConfig.title = 'Aviso';
    alertConfig.button1Text = 'OK';
    alertConfig.button1Action = () => {
      this._modalAlertService.closeAlertModal();
    };
    alertConfig.text = message;
    this._modalAlertService.setAlertConfiguration(alertConfig);
  }

  /**
   * Método responsável por limpar o formulário.
   */
  private clearForm(): void {
    this.meUser = new UserRegistrationModel();
    this.siafUser = new UserRegistrationModel();
  }

  /**
   * Método responsável por verificar se existe um chamado existente, caso não exista ele cria um com obs automática.
   * Essa ação serve para que o atendente não saia da tela sem que nada fosse registrado. Então, se for a primeira ação
   * do atendente, deve ser registrado um chamado.
   */
  private checkCalls(patient: UserRegistrationModel): void {
    const observation = AutomaticOBSUpdateData;
    observation.titles = new Array<SubjectModel>();
    observation.titles.push(AutomaticSubject);
    this._callActionService.checkCall(this.currentUser, patient, observation);
  }


  /**
   * Finaliza a incrição do componente, quando o mesmo é 'destruido'
   */
  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}
