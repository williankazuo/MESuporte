import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormRegistrationDataComponent } from 'src/app/components/form-registration-data/form-registration-data.component';
import { UserRegistrationModel } from 'src/app/@core/models/form-registration-data/user-form.model';
import { PatientDataService } from 'src/app/@core/services/patient-data/patient-data.service';
import { ModalAlertService } from 'src/app/@core/services/modal-alert/modal-alert.service';
import { CalledService } from 'src/app/@core/services/called/called.service';
import { CalledModel, UploadModel } from 'src/app/@core/models/new-called/new-called.model';
import { ModalAlert } from 'src/app/@core/models/modal-alert/modal-alert.model';
import { AuthenticationService } from 'src/app/@core/services/authentication/login.service';
import { UserModel } from 'src/app/@core/models/login/user.model';
import { CallType } from 'src/app/@core/consts/ended-calls/callType.const';
import { CallStatus } from 'src/app/@core/enums/ended-calls/call-status.enum';
import { CallReset } from 'src/app/@core/consts/ended-calls/callReset.const';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-new-called',
  templateUrl: './new-called.component.html',
  styleUrls: ['./new-called.component.scss']
})
export class NewCalledComponent implements OnInit, AfterViewInit {

  @ViewChild('form', { static: false }) form: FormRegistrationDataComponent;

  public showName = '';
  public placeholder = 'Pesquise por CPF, Prontuário ou Passaporte...';
  public readonly = false;

  private currentUser: UserModel;
  private siafUser: UserRegistrationModel;
  private meUser: UserRegistrationModel;
  private called: CalledModel;
  private images: UploadModel;

  public requiredInformation: boolean;
  public requiredData: boolean;

  constructor(
    private _authenticationService: AuthenticationService,
    private _patientDataService: PatientDataService,
    private _modalAlertService: ModalAlertService,
    private _calledService: CalledService,
    private _router: ActivatedRoute
  ) { }

  ngOnInit() {
    this._router.params.subscribe((params: Params) => {
      this.readonly = false;
      if (params['id']) {
        this.readonly = true;
        this.getCalledById(params['id']);
      }
    });

    this.currentUser = this._authenticationService.getCurrentUser();
    this.siafUser = new UserRegistrationModel();
    this.meUser = new UserRegistrationModel();
    this.called = new CalledModel();
    this.images = new UploadModel();
    this.requiredInformation = false;
    this.requiredData = false;
  }

  /**
   * Metodo acionado apos a inicialização do template do componente
   */
  ngAfterViewInit() {
    this.formatWindow();
  }

  private getCalledById(id: number): void {
    this._calledService.getCallById(id).subscribe((result: CalledModel) => {
      this.called = result;
      this.showName = this.called.namePatient;
    });
  }

  /**
   * Método responsavel por formatar a janela do navegador.
   * Mantem o botão finalizar com um espaçamento entre os demais itens
   * CALCULA O TAMANHO DO CONTAINER + O TAMANHO QUE O BOTÃO OCUPA NA JANELA.
   *    OBS: O botão fixo com bottom: 0, fica flutuando sobre os demais itens que estão no final da janela.
   *    O calculo é para "Criar espaçamento" do container e o botão fixo.
   */
  private formatWindow(): void {
    if (!this.readonly) {
      // pega o container que recebera a nova altura
      const container = document.getElementsByClassName('container__called')[0] as HTMLElement;

      // recebe a altura do header para desconsiderar no calculo
      const heightHeader = (window.getComputedStyle(document.getElementsByClassName('header__container')[0]).height).split('px')[0];
      // pega a altura do container para futuramente somar com a altura do botão fixo desta tela
      // OBS: Valor recebido com px. Ex: 20px. Neste get, ja ocorre a formatação para retirar o mesmo. Novo valor se mantem em string
      const heightContainer = ((window.getComputedStyle(document.getElementsByClassName('app')[0]).height).split('px')[0]);
      // Em seguida pega o valor de altura do botão que será fixo na tela
      const heightContainerButton = ((window.getComputedStyle(document.getElementsByClassName('button__fixed')[0]).height).split('px')[0]);
      // tslint:disable-next-line: radix
      container.style.height = (parseInt(heightContainer) + parseInt(heightContainerButton) - parseInt(heightHeader)).toString() + 'px';
    }
  }

  // #region Receber valores dos @OUTPUTS

  /**
   * Método responsável por receber os dados de informações do chamado por output.
   * @param data Dados do usuário.
   */
  public receivedCallInformationData(data: CalledModel): void {
    this.called = data;
  }

  /**
   * Método responsável por receber as imagens relacionadas ao chamado por output.
   * @param data Dados do usuário.
   */
  public receivedImagesInformationData(images: UploadModel): void {
    this.images = images;
  }

  /**
   * Método responsável por receber o texto do input por output.
   * Parâmetro [0] é o tipo de pesquisa, e o [1] o valor da pesquisa.
   */
  public receiveText(value: any) {
    this.showName = '';
    this._patientDataService.searchData(value[0], value[1]);
  }

  /**
   * Método responsável por receber os dados do usuário do meu einstein por output.
   * @param data Dados do usuário.
   */
  public receiveMEData(data: UserRegistrationModel) {
    this.meUser = data;
    if (!this.showName) {
      this.showName = data.fullName;
    }
  }

  /**
   * Método responsável por receber os dados do usuário do SGH por output.
   * @param data Dados do usuário.
   */
  public receiveSIAFData(data: UserRegistrationModel) {
    this.siafUser = data;
    if (data.name) {
      this.showName = data.name;
    }
  }

  // #endregion Receber valores dos @OUTPUTS

  /**
   * Método responsavel por salvar as informações relacionados ao chamado.
   * Salva as informações do chamado;
   * Salva as imagens relacionadas ao chamado;
   * Salva / altera os dados do paciente
   */
  public registerCallInformation(): void {
    // Verifica se existe atendente para preencher as demais informações,
    // para envio ao backend
    this.form.emitUserData();
    if (this.validInformations()) {
      if (this.meUser && this.meUser.fullName) {
        this.called.nameClerk = this.currentUser.name;
        this.called.namePatient = this.siafUser.name;
        this.called.medicalRecord = this.siafUser.medicalRecord;
        this.called.idStatus = CallStatus.Open;
        this.called.type = CallType.Telefone;

        this._calledService.registerCalled(this.called)
          .subscribe((result: any) => {
            this.configureSuccess();
            this._modalAlertService.openAlertModal();

            // salva as imagens relacionadas a esse chamado, caso exista imagens para ser salvas
            if (this.images.images.length > 0) {
              this.saveCallImages(result.idCalled);
            }

            this.resetForm();
          }, error => {
            this.configureError();
            this._modalAlertService.openAlertModal();
          });
      }
    }
  }

  /**
   * Metodo responsavel por validar se todos os processos da pagina está valido para inserir o chamado ao backend
   */
  private validInformations(): boolean {
    this.requiredInformation = this.called.observation.titles.length > 0 && this.called.observation.text.length > 0 ? false : true;
    this.requiredData = ((this.meUser.medicalRecord.length > 0 || this.siafUser.medicalRecord.length > 0) ? false : true);

    return !this.requiredInformation && !this.requiredData;
  }

  /**
   * Método responsavel por salvar as imagens relacionadas a um chamado que esta sendo cadastrdo.
   * Método acionado após a inserção das informações para o backend e retorno do mesmo contendo o id do novo chamado
   * @param idCalled id do chamado que foi cadastrado
   */
  private saveCallImages(idCalled: number): void {
    this.images.idCalled = idCalled;
    this._calledService.registerImagesCalled(this.images)
      .subscribe((result: any) => {
        this.images = new UploadModel();
      }, error => {
        this.images = new UploadModel();
      });
  }

  /**
   * Metodo responsavel por configurar o modal para apresentar a mensagem de sucesso.
   */
  public configureSuccess() {
    const alertConfig = new ModalAlert();
    alertConfig.title = 'Chamado finalizado com sucesso!';
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
  public configureError() {
    const alertConfig = new ModalAlert();
    alertConfig.title = 'Algo deu errado ao tentar finalizar o chamado. Tente novamente.';
    alertConfig.button1Text = 'Tentar novamente';
    alertConfig.image = '../../../assets/images/modal-alert/icon_error.png';
    alertConfig.button1Action = () => {
      this.registerCallInformation();
    };
    this._modalAlertService.setAlertConfiguration(alertConfig);
  }

  /**
   * Metodo responsavel por resetar todos os dados da pagina.
   */
  private resetForm(): void {
    window.scrollTo(0, 0);
    this._calledService.resetFields(CallReset.reset);
    // necessita de resetar estes valores aqui no componente por serem propriedades do mesmo
    this.siafUser = new UserRegistrationModel();
    this.meUser = new UserRegistrationModel();
    this.called = new CalledModel();
    this.showName = '';
  }

}
