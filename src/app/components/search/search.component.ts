import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchType } from 'src/app/@core/consts/searchType/searchType.const';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() placeholder = '';
  @Input() select = false;
  @Output() receiveText = new EventEmitter();

  public searchText = '';
  public selectedValue = '';
  public searchType = SearchType;
  public errorSelect = false;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Método responsável por emitir o texto do input.
   * Emite o campo de texto, e em caso de select box, emite o campo de texto e o valor do select.
   */
  public search() {
    if (this.select === true) {
      if (this.selectedValue !== '') {
        this.errorSelect = false;
        this.receiveText.emit([this.selectedValue, this.searchText]);
      } else {
        this.errorSelect = true;
      }
    } else {
      this.receiveText.emit(this.searchText);
    }
  }
}
