import { Component, OnInit } from '@angular/core';
import { FileModel } from 'src/app/@core/models/upload/upload.model';
import { ModalAddDependentService } from 'src/app/@core/services/modal-add-dependent/modal-add-dependent-service';
import { ModalDependentService } from 'src/app/@core/services/modal-dependent/modal-dependent.service';
import { NewDependentModel } from 'src/app/@core/models/dependent/new-dependent.model';
import { GenderEnumSIAF } from 'src/app/@core/enums/gender/gender.enum';
import { DependentService } from 'src/app/@core/services/dependents/dependent.service';
import { ModalAlert } from 'src/app/@core/models/modal-alert/modal-alert.model';
import { ModalAlertService } from 'src/app/@core/services/modal-alert/modal-alert.service';
import { DocumentType } from 'src/app/@core/consts/documentType/documentType.const';

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

  constructor(
    private _modalAddDependentService: ModalAddDependentService,
    private _modalDependentService: ModalDependentService,
    private _dependentService: DependentService,
    private _modalAlertService: ModalAlertService
  ) { }

  ngOnInit() {
    this._modalAddDependentService.$openAlert.subscribe(data => {
      this.open = data.open;
      this.idTableHolder = data.idTabelaTitular;
    });
  }

  public receiveImages(images: Array<FileModel>): void {

  }

  /**
   * Método responsável por voltar.
   * Abrir o modal anterior e fechar este atual.
   */
  public backModal(): void {
    this._modalDependentService.openModalDependent(this.idTableHolder);
    this.open = false;
  }

  /**
   * Método responsável por adicionar um novo dependente.
   */
  public addDependent(): void {
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
    }, error => {
      this.open = false;
      this.configureError();
      this._modalAlertService.openAlertModal();
    });
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


}
