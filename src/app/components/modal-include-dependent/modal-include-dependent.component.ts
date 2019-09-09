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
  public search: boolean;

  constructor(
    private _modalDependentService: ModalDependentService,
    private _addDependentService: ModalAddDependentService,
    private _dependentService: DependentService,
    private _modalAlertService: ModalAlertService,
    private _dateUtilService: DateUtilService
  ) { }

  ngOnInit() {
    this._modalDependentService.$openAlert.subscribe(data => {
      this.open = data.open;
      this.idTableHolder = data.idTabelaTitular;
    });
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
    this._addDependentService.openModaAddDependent(this.idTableHolder);
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
    const attachDependent = new AttachDependentModel();
    // tslint:disable-next-line: radix
    attachDependent.pacienteDR = parseInt(this.idTableHolder);
    attachDependent.pessoaDR = this.idTableDependent;
    this._dependentService.attachDependent(attachDependent).subscribe(response => {
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
    alertConfig.title = 'Sua solicitação de vínculo de dependente foi realizado com sucesso!';
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
   * Método responsável por resetar os filtros e a lista filtrada.
   */
  public resetForm(): void {
    this.idTableDependent = 0;
    this.idTableHolder = '';
    this.filter = new FilterDependent();
    this.list = new ListDependentArray();
  }

}
