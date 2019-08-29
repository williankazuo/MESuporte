import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SubjectModel } from 'src/app/@core/models/new-called/new-called.model';
import { CalledService } from 'src/app/@core/services/called/called.service';

@Component({
  selector: 'app-called-subjects',
  templateUrl: './called-subjects.component.html',
  styleUrls: ['./called-subjects.component.scss']
})
export class CalledSubjectsComponent implements OnInit {

  /** Propriedade de retorno para o componente pai, retorna a lista de assunto relacionados ao chamado */
  @Output() insertedSubject = new EventEmitter<Array<SubjectModel>>();
  /** Propriedade para receber do componente pai, se a lista de chamado esta valida ou não */
  @Input() validSubject: boolean = false;

  /** Propriedade para receber o assunto selecionado do select */
  public subjectId: number;
  /** Propriedade para receber o assunto selecionado do select */
  public subject: string;
  /** Propriedade para preparar a lista de assuntos do chamado que será mandado para o backend */
  public listSubject: Array<SubjectModel>;
  /** propriedade para receber a lista de assuntos do chamado do backend */
  public listAllCallSubject: Array<SubjectModel>;

  constructor(
    private _calledService: CalledService
  ) { }

  ngOnInit() {
    this.subjectId = 0;
    this.listSubject = new Array<SubjectModel>();

    this.getListCallSubject();
  }

  /**
   * Método responsavel por receber a lista de chamados do backend
   */
  private getListCallSubject(): void {
    this._calledService.getListCallSubject()
      .subscribe((result: Array<SubjectModel>) => {
        this.listAllCallSubject = result;
        this.parseList();
      }, error => { });
  }

  /**
   * Metodo responsavel por criar um novo item a lista de chamados.
   * Item para controlar o campo de input para entrada de novos assuntos, que não esteja na lista
   */
  private parseList(): void {
    const others: SubjectModel = new SubjectModel();
    others.descTitle = 'Outros';
    others.isOther = true;
    others.id = null;

    this.listAllCallSubject.push(others);
  }

  /**
   * Metodo responsavel por adicionar a lista de assuntos, um novo assunto selecionado
   * @param {object} subject assunto que foi selecionado
   */
  public selectSubject(id: string): void {
    if (id !== null && id !== '') {
      // converte o id recebido do select para int
      // (select retorna sempre uma string como value)
      const newId = parseInt(id);

      // verifica se o elemento selecionado ja não esta a
      const validList = this.listSubject.filter((item: SubjectModel) => item.id === newId)[0];

      // permite adicionar para a lista, apenas se não estiver inserido
      if (!validList) {
        this.updateCallList(this.listAllCallSubject.filter((item: SubjectModel) => item.id === newId)[0]);
      }
    }
  }

  /**
   * Método responsavel por adicionar um novo assunto a lista de assuntos relacionados ao chamado
   * @param {string} subject assunto que esta sendo adiconado ao chamado
   */
  public addNewSubject(subjectDescText: string): void {
    if (subjectDescText.length > 0) {

      const subjectCalled: SubjectModel = new SubjectModel();
      subjectCalled.descTitle = subjectDescText;
      subjectCalled.isOther = true;

      this.updateCallList(subjectCalled);

      // reseta o campo de input
      this.subjectId = 0;
      this.subject = '';
    }
  }

  /**
   * Método responsavel pór atualizar a lista de assuntos que sera enviada ao backend
   * @param subjectCalled Novo assunto que esta sendo adicionado a lista
   */
  private updateCallList(subjectCalled: SubjectModel) {
    this.listSubject.push(subjectCalled);
    this.insertedSubject.emit(this.listSubject);
  }

  /**
   * Metodo responsavel por remover um item da lista de assuntos
   * @param {number} index index do elemento que sera removido da lista
   */
  public removeSubject(index: number): void {
    this.listSubject.splice(index, 1);
  }

}
