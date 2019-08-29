import { Component, OnInit } from '@angular/core';

import { CalledModel, UploadModel, SubjectModel } from 'src/app/@core/models/new-called/new-called.model';
import { FileModel } from 'src/app/@core/models/upload/upload.model';
import { CalledService } from 'src/app/@core/services/called/called.service';

@Component({
  selector: 'app-call-information',
  templateUrl: './call-information.component.html',
  styleUrls: ['./call-information.component.scss']
})
export class CallInformationComponent implements OnInit {

  private called: CalledModel;
  private images: UploadModel;

  constructor(
    private _calledService: CalledService
  ) { }

  ngOnInit() {
    this.called = new CalledModel();
    this.images = new UploadModel();
  }

  /**
   * Metodo responsavel por receber do componente filho os assuntos relacionados ao chamado
   * @param {Array<SubjectModel>} subject lista de assuntos relacionados ao chamado
   */
  public receiveSubject(subject: Array<SubjectModel>): void {
    this.called.observation.titles = subject;
  }

  /**
   * Metodo responsavel por receber do componente filho as imagens inseridas
   * @param {Array<SubjectModel>} images lista de assuntos relacionados ao chamado
   */
  public receiveImages(images: Array<FileModel>): void {
    this.images.images = images;
  }

  public testeSupremo(): void {
    console.log(this.called);
    console.log(this.images);

    this._calledService.registerCalled(this.called)
      .subscribe((result: any) => {
        console.log(result, 'salve familia');
      }, error => {
        console.log(error, 'deu ruim familia');
      });
  }

}
