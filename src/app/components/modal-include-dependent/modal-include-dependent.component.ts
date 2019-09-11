import { Component, OnInit } from '@angular/core';
import { ModalDependentService } from 'src/app/@core/services/modal-dependent/modal-dependent.service';
import { ModalAddDependentService } from 'src/app/@core/services/modal-add-dependent/modal-add-dependent-service';
import { DependentService } from 'src/app/@core/services/dependents/dependent.service';
import { FilterDependent } from 'src/app/@core/models/dependent/filter-dependent.model';
import { ListDependentArray } from 'src/app/@core/models/dependent/list-dependent.model';
import { AttachDependentModel } from 'src/app/@core/models/dependent/attach-dependent.model';
import { ModalAlertService } from 'src/app/@core/services/modal-alert/modal-alert.service';
import { ModalAlert } from 'src/app/@core/models/modal-alert/modal-alert.model';
import { DateUtilService } from 'src/app/@core/services/utils/date.service';
import { AutomaticOBSAttachDependent, AutomaticSubject } from 'src/app/@core/consts/observation/automatic-observation.const';
import { AuthenticationService } from 'src/app/@core/services/authentication/login.service';
import { UserModel } from 'src/app/@core/models/login/user.model';
import { CallActionService } from 'src/app/@core/services/called/call-action.service';
import { SubjectModel } from 'src/app/@core/models/new-called/new-called.model';
import { UserRegistrationModel } from 'src/app/@core/models/form-registration-data/user-form.model';

@Component({
  selector: 'app-modal-include-dependent',
  templateUrl: './modal-include-dependent.component.html',
  styleUrls: ['./modal-include-dependent.component.scss']
})
export class ModalIncludeDependentComponent implements OnInit {
  public open = false;
  public idTableDependent = 0;
  public idTableHolder = '';
  public filter = new FilterDependent();
  public list = new ListDependentArray();
  public tableHeader = ['', 'Prontuário', 'Nome do Paciente', 'Nacionalidade', 'CPF', 'Passaporte', 'Nascimento', 'Sexo'];
  private currentUser: UserModel;
  private patient = new UserRegistrationModel();
  public search: boolean;

  constructor(
    private _modalDependentService: ModalDependentService,
    private _addDependentService: ModalAddDependentService,
    private _dependentService: DependentService,
    private _modalAlertService: ModalAlertService,
    private _dateUtilService: DateUtilService,
    private _authenticationService: AuthenticationService,
    private _callActionService: CallActionService
  ) { }

  ngOnInit() {
    this._modalDependentService.$openAlert.subscribe(data => {
      this.open = data.open;
      this.idTableHolder = data.idTabelaTitular;
      this.patient = data.patient;
    });
    this.currentUser = this._authenticationService.getCurrentUser();
  }

  /**
   * Método responsável por selecionar um dependente pesquisado.
   * @param idTabela id do dependente selecionado.
   */
  public selectDependent(idTableDependent: number): void {
    this.idTableDependent = idTableDependent;
  }


  /**
   * Método responsável por abrir o modal de adicionar um novo dependente.
   */
  public addDependent(): void {
    this._addDependentService.openModaAddDependent(this.idTableHolder, this.patient);
    this.open = false;
  }

  /**
   * Método responsável por buscar os pacientes que vão ser vinculados ao titular. De acordo com os filtros digitados.
   */
  public searchPatient(): void {
    this._dependentService.filterDependent(this.filter).subscribe(response => {
      this.search = true;
      this.list = response;
      // Formatar as datas
      this.list.objeto.map(data => {
        data.dataNascimento = this._dateUtilService.convertShowDate(data.dataNascimento);
        return data;
      });
    }, error => {

    });
  }


  /**
   * Método responsável por vincular um dependente, e exibir as mensagens de sucesso ou erro.
   */
  public attachDependent(): void {
    // Buscar o dependente na lista de acordo com o dependente selecionado.
    const dep = this.list.objeto.find(data => {
      if (data.idTabela === this.idTableDependent) {
        return data;
      }
    });

    // Só pode vincular um dependente se ele for menor de 18 anos.
    if (this._dateUtilService.calculateAge(dep.dataNascimento)) {
      const attachDependent = new AttachDependentModel();
      // tslint:disable-next-line: radix
      attachDependent.pacienteDR = parseInt(this.idTableHolder);
      attachDependent.pessoaDR = this.idTableDependent;
      this._dependentService.attachDependent(attachDependent).subscribe(response => {
        this.open = false;
        this.configureSuccess();
        this._modalAlertService.openAlertModal();
        this.checkCalls(this.patient);
      }, error => {
        this.open = false;
        this.configureError();
        this._modalAlertService.openAlertModal();
      });
    } else {
      this.configureNotPossible();
      this._modalAlertService.openAlertModal();
    }
  }


  /**
   * Método responsável por configurar o modal de alerta de sucesso com imagem.
   */
  public configureSuccess(): void {
    const alertConfig = new ModalAlert();
    alertConfig.title = 'Vínculo de dependente foi realizado com sucesso!';
    alertConfig.button1Text = 'OK';
    alertConfig.image = '../../../assets/images/modal-alert/icon_ok.png';
    alertConfig.button1Action = () => {
      this._modalAlertService.closeAlertModal();
      this.resetForm();
    };
    this._modalAlertService.setAlertConfiguration(alertConfig);
  }

  /**
   * Método responsável por configurar o modal de alerta de erro com imagem. E tentar novamente chamando o método novamente.
   */
  public configureError(): void {
    const alertConfig = new ModalAlert();
    alertConfig.title = 'Algo deu errado no vínculo de dependente. Tente novamente.';
    alertConfig.button1Text = 'Tentar novamente';
    alertConfig.image = '../../../assets/images/modal-alert/icon_error.png';
    alertConfig.button1Action = () => {
      this.open = true;
      this._modalAlertService.closeAlertModal();
    };
    this._modalAlertService.setAlertConfiguration(alertConfig);
  }

  /**
   * Método responsável por configurar o alerta de não foi possível realizar um vínculo.
   */
  public configureNotPossible(): void {
    this.open = false;
    const alertConfig = new ModalAlert();
    alertConfig.title = 'Aviso';
    alertConfig.button1Text = 'OK';
    alertConfig.text = 'Não é possível víncular um dependente maior de 18 anos.';
    alertConfig.button1Action = () => {
      this.open = true;
      this._modalAlertService.closeAlertModal();
    };
    this._modalAlertService.setAlertConfiguration(alertConfig);
  }

  /**
   * Método responsável por resetar os filtros e a lista filtrada.
   */
  public resetForm(): void {
    this.idTableDependent = 0;
    this.idTableHolder = '';
    this.filter = new FilterDependent();
    this.list = new ListDependentArray();
  }

  /**
   * Método responsável por verificar se existe um chamado existente, caso não exista ele cria um com obs automática.
   * Essa ação serve para que o atendente não saia da tela sem que nada fosse registrado. Então, se for a primeira ação
   * do atendente, deve ser registrado um chamado.
   */
  private checkCalls(patient: UserRegistrationModel): void {
    const observation = AutomaticOBSAttachDependent;
    observation.titles = new Array<SubjectModel>();
    observation.titles.push(AutomaticSubject);
    this._callActionService.checkCall(this.currentUser, patient, observation);
  }

}
