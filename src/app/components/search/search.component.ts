import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { SearchType } from 'src/app/@core/consts/searchType/searchType.const';
import { CPFMaskService } from 'src/app/@core/services/utils/cpfmask.service';
import { CalledService } from 'src/app/@core/services/called/called.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() placeholder = '';
  @Input() select = false;
  @Input() disableSearch = false;
  @Output() receiveText = new EventEmitter();

  public searchText = '';
  public selectedValue = SearchType.cpf;
  public searchType = SearchType;
  public errorSelect = false;

  private unsubscribe: any;

  constructor(
    private _calledService: CalledService,
    private _cpfMaskService: CPFMaskService
  ) { }

  ngOnInit() {
  }

  /**
   * Metodo Acionado apos a conclusão da exibição do componente, ativando a incrição do componente
   * para a que o mesmo saiba quando será necessário limpar/resetar os campos do formulário.
   */
  ngAfterViewInit() {
    this.unsubscribe = this._calledService.resetFormSubscriber.subscribe((context: boolean) => {
      if (context) {
        this.searchText = '';
      }
    });
  }

  /**
   * Método responsável por emitir o texto do input.
   * Emite o campo de texto, e em caso de select box, emite o campo de texto e o valor do select.
   */
  public search(): void {
    console.log(this.searchText);
    let text = JSON.parse(JSON.stringify(this.searchText));
    if (this.select === true) {
      this.errorSelect = false;
      if (this.selectedValue === SearchType.cpf) {
        text = this._cpfMaskService.removeCPFMask(text);
      }
      this.removeBlur();
      this.receiveText.emit([this.selectedValue, text]);
    } else {
      this.receiveText.emit(text);
    }
  }

  /**
   * Metodo responsavel por remover o foco dos campos de busca.
   */
  private removeBlur(): void {
    const resetInput: any = document.getElementsByClassName('blur');
    for (let i = 0; i <= resetInput.length - 1; i++) {
      resetInput[i].blur();
    }
  }

  /**
   * Método chamado no change do select, para zerar o campo de texto.
   */
  public changeSelectedValue(): void {
    this.searchText = '';
  }
  /**
   * Finaliza a incrição do componente, quando o mesmo é 'destruido'
   */
  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}
