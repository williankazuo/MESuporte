import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { PreviewFileModel, FileModel } from 'src/app/@core/models/upload/upload.model';
import { CalledService } from 'src/app/@core/services/called/called.service';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent implements OnInit, OnDestroy, AfterViewInit {

  /** Saida de dados para retornar ao componente pai a lista de imagens inseridad */
  @Output() insertedImages = new EventEmitter<Array<FileModel>>();

  /** Entrada de dados tipo files, contendo as imagens */
  @Input() files: Array<File>;

  /** Entrada de dados para maiores modais */
  @Input() bigger = false;

  /** Propriedade responsavel por receber do componente pai as imagens que serão utilizadas no preview */
  @Input()
  set receivedImages(images: Array<string>) {
    images.forEach((image: string) => {
      this.previewImages.push(new PreviewFileModel(image));
    });
  }

  /** Propriedade responsavel por controlar o modo leitura do componente */
  @Input()
  set readonly(readonly: boolean) {
    this._readonly = readonly;
  }

  public _readonly: boolean;

  public previewImages: Array<PreviewFileModel>;

  private filesImages: Array<FileModel>;

  private unsubscribe: any;

  constructor(
    private _calledService: CalledService
  ) { }

  ngOnInit() {
    this.files = [];
    this.previewImages = [];
    this.filesImages = [];

    if (this.files.length > 0) {
      this.files.forEach((file: File) => {
        this.setPreviewImage(file);
      });
    }
  }

  /**
   * Metodo Acionado apos a conclusão da exibição do componente, ativando a incrição do componente
   * para a que o mesmo saiba quando será necessário limpar/resetar os campos do formulário.
   */
  ngAfterViewInit() {
    this.unsubscribe = this._calledService.resetFormSubscriber.subscribe((context: boolean) => {
      if (context) {
        this.previewImages = new Array<PreviewFileModel>();
        this.filesImages = new Array<FileModel>();
      }
    });
  }

  /**
   * Método que lê a imagem que foi selecionada do input file e transforma em base64 adicionando no array de srcs de imagem.
   * @param event evento de input file
   */
  public addPicture(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.validImage(file);
    }
  }

  /**
   * Método de upload por drag and drop, e a partir de cada arquivo setar o preview da imagem no box.
   * @param event evento do componente, contém os arquivos arrastados para a div.
   */
  public fileDropped(files: FileList): void {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < files.length; index++) {
      this.validImage(files[index]);
    }
  }

  /**
   * Metodo responsavel por validar se o arquivo inserido é uma imagem.
   * @param {File} file imagem que esta sendo inserido
   */
  private validImage(file: File): void {
    if (file.name.length > 0) {
      if (file.name.includes('.svg') || file.name.includes('.gif') ||
        file.name.includes('.jpg') || file.name.includes('.jpeg') ||
        file.name.includes('.png')) {
        this.setPreviewImage(file);
      }
    }
  }

  /**
   * Método responsável para setar o preview da imagem no box e atualizar o array de imagens do local storage.
   * A imagem deve ter um src, e um number para saber qual imagem deve ser clicada.
   * @param file Arquivo da imagem.
   */
  private setPreviewImage(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.filesImages.push(new FileModel(file));
      this.previewImages.push(new PreviewFileModel(reader.result));

      this.insertedImages.emit(this.filesImages);
    };
  }

  /**
   * Método responsavel por remover um item da lista de imagens.
   * @param index index que esta sendo removido da lista de imagens
   */
  public deleteImage(index: number): void {
    this.filesImages.splice(index, 1);
    this.previewImages.splice(index, 1);

    this.insertedImages.emit(this.filesImages);
  }

  /**
   * Finaliza a incrição do componente, quando o mesmo é 'destruido'
   */
  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

}