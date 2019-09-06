import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, OnDestroy } from '@angular/core';

import { CalledModel, UploadModel, SubjectModel } from 'src/app/@core/models/new-called/new-called.model';
import { FileModel } from 'src/app/@core/models/upload/upload.model';
import { CalledService } from 'src/app/@core/services/called/called.service';

@Component({
  selector: 'app-call-information',
  templateUrl: './call-information.component.html',
  styleUrls: ['./call-information.component.scss']
})
export class CallInformationComponent implements OnInit, AfterViewInit, OnDestroy {

  /** propriedade para manter os campos apenas para leitura */
  @Input()
  set readonly(readonly: boolean) {
    this._readonly = readonly;
  }
  /** Propriedade para receber do componente pai as informações de um chamado */
  @Input()
  set receivedCalled(receivedCalled: CalledModel) {
    // condição verificando se o componente recebeu de seu pai os dados.
    if (receivedCalled.medicalRecord && receivedCalled.namePatient) {
      this.called = receivedCalled;
    }
  }

  /** Propriedade que controla a obrigatóriedade dos campos de input */
  @Input() required: boolean;

  /** Propriedade para emitir as informações do chamado */
  @Output() receivedCallInformationData = new EventEmitter<CalledModel>();
  /** Propriedade para emitir as informações do chamado */
  @Output() receivedImagesInformationData = new EventEmitter<UploadModel>();

  private called: CalledModel;
  private images: UploadModel;

  public _readonly: boolean;

  private unsubscribe: any;

  constructor(
    private _calledService: CalledService
  ) { }

  ngOnInit() {
    this.called = new CalledModel();
    this.images = new UploadModel();
  }

  /**
   * Metodo Acionado apos a conclusão da exibição do componente, ativando a incrição do componente
   * para a que o mesmo saiba quando será necessário limpar/resetar os campos do formulário.
   */
  ngAfterViewInit() {
    this.unsubscribe = this._calledService.resetFormSubscriber.subscribe((context: boolean) => {
      if (context) {
        this.called = new CalledModel();
      }
    });
  }

  /**
   * Metodo responsavel por receber do componente filho os assuntos relacionados ao chamado
   * E por fim, emitir o valor para a pagina que será responsavel por fazer a request para o backend
   * @param {Array<SubjectModel>} subject lista de assuntos relacionados ao chamado
   */
  public receiveSubject(subject: Array<SubjectModel>): void {
    this.called.observation.titles = subject;

    this.receivedCallInformationData.emit(this.called);
  }

  /**
   * Metodo responsavel por receber do componente filho as imagens inseridas
   * E por fim, emitir o valor para a pagina que será responsavel por fazer a request para o backend
   * @param {Array<FileModel>} images lista de assuntos relacionados ao chamado
   */
  public receiveImages(images: Array<FileModel>): void {
    this.images.images = images;

    this.receivedImagesInformationData.emit(this.images);
  }

  /**
   * Finaliza a incrição do componente, quando o mesmo é 'destruido'
   */
  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

}