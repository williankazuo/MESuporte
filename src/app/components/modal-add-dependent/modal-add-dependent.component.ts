import { Component, OnInit } from '@angular/core';
import { FileModel } from 'src/app/@core/models/upload/upload.model';
import { ModalAddDependentService } from 'src/app/@core/services/modal-add-dependent/modal-add-dependent-service';
import { ModalDependentService } from 'src/app/@core/services/modal-dependent/modal-dependent.service';
import { NewDependentModel, ErrorDependentModel } from 'src/app/@core/models/dependent/new-dependent.model';
import { GenderEnumSIAF } from 'src/app/@core/enums/gender/gender.enum';
import { DependentService } from 'src/app/@core/services/dependents/dependent.service';
import { ModalAlert } from 'src/app/@core/models/modal-alert/modal-alert.model';
import { ModalAlertService } from 'src/app/@core/services/modal-alert/modal-alert.service';
import { DocumentType } from 'src/app/@core/consts/documentType/documentType.const';
import { UserRegistrationModel } from 'src/app/@core/models/form-registration-data/user-form.model';
import { AutomaticOBSAddDependent, AutomaticSubject } from 'src/app/@core/consts/observation/automatic-observation.const';
import { CallActionService } from 'src/app/@core/services/called/call-action.service';
import { AuthenticationService } from 'src/app/@core/services/authentication/login.service';
import { UserModel } from 'src/app/@core/models/login/user.model';
import { SubjectModel } from 'src/app/@core/models/new-called/new-called.model';

@Component({
  selector: 'app-modal-add-dependent',
  templateUrl: './modal-add-dependent.component.html',
  styleUrls: ['./modal-add-dependent.component.scss']
})
export class ModalAddDependentComponent implements OnInit {
  public open = false;
  public idTableHolder = '';
  public idTableDependent = '';
  public newDependent = new NewDependentModel();
  public birthDate = '';
  public genderEnum = GenderEnumSIAF;
  public errorDep = new ErrorDependentModel();
  private patient = new UserRegistrationModel();
  private currentUser: UserModel;

  constructor(
    private _modalAddDependentService: ModalAddDependentService,
    private _modalDependentService: ModalDependentService,
    private _dependentService: DependentService,
    private _modalAlertService: ModalAlertService,
    private _callActionService: CallActionService,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this._modalAddDependentService.$openAlert.subscribe(data => {
      this.open = data.open;
      this.idTableHolder = data.idTabelaTitular;
      this.patient = data.patient;
    });
    this.currentUser = this._authenticationService.getCurrentUser();
  }

  public receiveImages(images: Array<FileModel>): void {

  }

  /**
   * Método responsável por voltar.
   * Abrir o modal anterior e fechar este atual.
   */
  public backModal(): void {
    this._modalDependentService.openModalDependent(this.idTableHolder, this.patient);
    this.open = false;
  }

  /**
   * Método responsável por adicionar um novo dependente.
   */
  public addDependent(): void {
    if (this.validInformations()) {
      const dependent = JSON.parse(JSON.stringify(this.newDependent)) as NewDependentModel;
      dependent.documentType = DocumentType.Cpf;
      dependent.documentNumber = dependent.documentNumber.replace(/[\D]/g, '');
      // tslint:disable-next-line: radix
      dependent.idTableHolder = parseInt(this.idTableHolder);
      const dates = this.birthDate.split('/');
      dependent.birthDate = `${dates[2]}-${dates[1]}-${dates[0]}T00:00:00`;
      this._dependentService.addDependent(dependent).subscribe(response => {
        this.open = false;
        this.configureSuccess();
        this._modalAlertService.openAlertModal();
        this.checkCalls(this.patient);
      }, error => {
        this.open = false;
        this.configureError();
        this._modalAlertService.openAlertModal();
      });
    }
  }

  /**
   * Método responsável por configurar o modal de alerta de sucesso com imagem.
   */
  public configureSuccess(): void {
    const alertConfig = new ModalAlert();
    alertConfig.title = 'Cadastro de dependente foi realizado com sucesso!';
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
  public configureError(): void {
    const alertConfig = new ModalAlert();
    alertConfig.title = 'Algo deu errado para adicionar um novo dependente. Tente novamente.';
    alertConfig.button1Text = 'Tentar novamente';
    alertConfig.image = '../../../assets/images/modal-alert/icon_error.png';
    alertConfig.button1Action = () => {
      this.open = true;
      this._modalAlertService.closeAlertModal();
    };
    this._modalAlertService.setAlertConfiguration(alertConfig);
  }


  /**
   * Método responsável por verificar se existe um chamado existente, caso não exista ele cria um com obs automática.
   * Essa ação serve para que o atendente não saia da tela sem que nada fosse registrado. Então, se for a primeira ação
   * do atendente, deve ser registrado um chamado.
   */
  private checkCalls(patient: UserRegistrationModel): void {
    const observation = AutomaticOBSAddDependent;
    observation.titles = new Array<SubjectModel>();
    observation.titles.push(AutomaticSubject);
    this._callActionService.checkCall(this.currentUser, patient, observation);
  }

  /**
   * Método responsável por validar as informações obrigatórias, e exibir os campos obrigatórios.
   */
  private validInformations(): boolean {
    let valid = true;

    this.errorDep.name = this.newDependent.name === '' ? true : false;
    this.errorDep.birthDate = this.birthDate.length < 10 ? true : false;
    this.errorDep.documentNumber = this.newDependent.documentNumber.length < 14 ? true : false;
    this.errorDep.sex = this.newDependent.sex === 0 ? true : false;

    Object.entries(this.errorDep).forEach(([key, value]) => {
      if (value) {
        valid = false;
      }
    });
    return valid;
  }
}
