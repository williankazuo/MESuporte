import { Component, OnInit } from '@angular/core';
import { FilterModel } from 'src/app/@core/models/ended-calls/filter.model';
import { EndedCallsList } from 'src/app/@core/models/ended-calls/ended-list.model';
import { CallType } from 'src/app/@core/consts/ended-calls/callType.const';
import { CalledService } from 'src/app/@core/services/called/called.service';
import { Router } from '@angular/router';
import { Routes } from 'src/app/@core/consts/routes/routes.const';

@Component({
  selector: 'app-ended-calls',
  templateUrl: './ended-calls.component.html',
  styleUrls: ['./ended-calls.component.scss']
})
export class EndedCallsComponent implements OnInit {
  public filter = new FilterModel();
  public list = new Array<EndedCallsList>();
  public dateFrom = '';
  public dateUntil = '';
  public callType = CallType;
  private today = new Date();

  constructor(
    private _callsService: CalledService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.filterList();
  }


  /**
   * Método responsável por filtrar a lista dos chamados finalizados.
   */
  public filterList() {
    this.convertDates();
    this._callsService.filterEndedCalls(this.filter).subscribe(response => {
      this.list = response;
    }, error => {
      this.list = new Array<EndedCallsList>();
    });
  }

  /**
   * Método responsável por converter as datas para envio do backend.
   */
  private convertDates() {
    if (this.dateUntil === '') {
      this.filter.dateLast = this.zeroLeft(this.today.getFullYear()) + '-' + this.zeroLeft((this.today.getMonth() + 1)) + '-'
        + this.zeroLeft(this.today.getDate()) + 'T' + this.zeroLeft(this.today.getHours()) + ':'
        + this.zeroLeft(this.today.getMinutes()) + ':' + this.zeroLeft(this.today.getSeconds());
    } else {
      const dates = this.dateUntil.split('/');
      this.filter.dateLast = `${dates[2]}-${dates[1]}-${dates[0]}T23:59:59`;
    }
    if (this.dateFrom !== '') {
      const dates = this.dateFrom.split('/');
      this.filter.dateFirst = `${dates[2]}-${dates[1]}-${dates[0]}T00:00:00`;
    }
  }




  /**
   * Método responsável por colocar um zero a esquerda.
   * @param value valor para colocar zero a esquerda.
   */
  public zeroLeft(value: number) {
    if (value < 10) {
      return '0' + value;
    } else {
      return value.toString();
    }
  }

  /**
   * Método responsável por enviar para a página de chamado.
   * @param id Id do chamado.
   */
  public openCall(id: number, type: string) {
    if (type === this.callType.Telefone) {
      this._router.navigateByUrl(Routes.new_called + '/' + id);
    } else {
      this._router.navigateByUrl(Routes.home + '/' + id);
    }
  }


}
