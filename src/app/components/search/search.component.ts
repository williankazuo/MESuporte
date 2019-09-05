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
  public selectedValue = '';
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
        this.selectedValue = '';
      }
    });
  }

  /**
   * Método responsável por emitir o texto do input.
   * Emite o campo de texto, e em caso de select box, emite o campo de texto e o valor do select.
   */
  public search(): void {
    if (this.select === true) {
      if (this.selectedValue !== '') {
        this.errorSelect = false;
        if (this.selectedValue === SearchType.cpf) {
          this.searchText = this._cpfMaskService.removeCPFMask(this.searchText);
        }
        this.receiveText.emit([this.selectedValue, this.searchText]);
      } else {
        this.errorSelect = true;
      }
    } else {
      this.receiveText.emit(this.searchText);
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
