import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientDataService } from 'src/app/@core/services/patient-data/patient-data.service';
import { FormRegistrationDataComponent } from 'src/app/components/form-registration-data/form-registration-data.component';
import { UserRegistrationModel } from 'src/app/@core/models/form-registration-data/user-form.model';
import { ModalAlert } from 'src/app/@core/models/modal-alert/modal-alert.model';
import { ModalAlertService } from 'src/app/@core/services/modal-alert/modal-alert.service';
import { ActivatedRoute } from '@angular/router';
import { CalledService } from 'src/app/@core/services/called/called.service';
import { SearchType } from 'src/app/@core/consts/searchType/searchType.const';
import { CalledModel } from 'src/app/@core/models/new-called/new-called.model';

@Component({
  selector: 'app-home-called',
  templateUrl: './home-called.component.html',
  styleUrls: ['./home-called.component.scss']
})
export class HomeCalledComponent implements OnInit {
  @ViewChild('form', { static: false }) form: FormRegistrationDataComponent;

  public placeholder = 'Pesquise por CPF, Prontuário ou Passaporte...';
  public readonly = false;
  public call = new CalledModel();
  private sghUser = new UserRegistrationModel();
  private meUser = new UserRegistrationModel();

  constructor(
    private _patientDataService: PatientDataService,
    private _modalAlertService: ModalAlertService,
    private _route: ActivatedRoute,
    private _calledService: CalledService) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      if (params['id']) {
        this.readonly = true;
        this.getCallById(params['id']);
      } else {
        this.readonly = false;
      }
    });
  }

  /**
   * Método responsável por receber o texto do input por output.
   * Parâmetro [0] é o tipo de pesquisa, e o [1] o valor da pesquisa.
   */
  public receiveText(value: any) {
    this._patientDataService.searchData(value[0], value[1]);
  }

  /**
   * Método responsável por receber os dados do usuário do meu einstein por output.
   * @param data Dados do usuário.
   */
  public receiveMEData(data: UserRegistrationModel) {
    this.meUser = data;
  }

  /**
   * Método responsável por receber os dados do usuário do SGH por output.
   * @param data Dados do usuário.
   */
  public receiveSGHData(data: UserRegistrationModel) {
    this.sghUser = data;
  }

  /**
   * Método responsável por finalizar um chamado.
   */
  public endCall() {
    this.form.emitUserData();
    this._patientDataService.updateDataME(this.meUser).subscribe(response => {
      this.configureSuccess();
      this._modalAlertService.openAlertModal();
    }, error => {
      this.configureError();
      this._modalAlertService.openAlertModal();
    });
  }

  /**
   * Método responsável por configurar o modal de alerta de sucesso com imagem.
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
      this.endCall();
    };
    this._modalAlertService.setAlertConfiguration(alertConfig);
  }

  /**
   * Método responsável por buscar o chamado por ID e preencher os campos automaticamente.
   * @param id id do chamado.
   */
  public getCallById(id: number) {
    this._calledService.getCallById(id).subscribe(response => {
      this.receiveText([SearchType.prontuario, response.medicalRecord]);
    });
  }

}
