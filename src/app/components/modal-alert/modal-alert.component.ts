import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalAlert } from 'src/app/@core/models/modal-alert/modal-alert.model';
import { ModalAlertService } from 'src/app/@core/services/modal-alert/modal-alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss']
})
export class ModalAlertComponent implements OnInit, OnDestroy {
  public open = false;
  public alert = new ModalAlert();

  private openSubscription: Subscription;
  private alertSubscription: Subscription;

  constructor(
    private _modalAlertService: ModalAlertService
  ) { }

  ngOnInit() {
    this.openSubscription = this._modalAlertService.$openAlert.subscribe(data => this.open = data);
    this.alertSubscription = this._modalAlertService.$alertConfig.subscribe(data => this.alert = data);
  }

  ngOnDestroy() {
    if (this.openSubscription) {
      this.openSubscription.unsubscribe();
    }
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }

}
