import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './@core/interceptor/auth.interceptor';
import { AuthGuard } from './@core/guards/auth-guard';
import { AuthenticationService } from './@core/services/authentication/login.service';
import { MenuService } from './@core/services/header/menu.service';
import { ModalAlertService } from './@core/services/modal-alert/modal-alert.service';
import { ComponentsModule } from './components/components.module';
import { LoginGuard } from './@core/guards/login-guard';
import { PatientDataService } from './@core/services/patient-data/patient-data.service';
import { LoadingService } from './@core/services/loading/loading.service';
import { CalledService } from './@core/services/called/called.service';
import { ModalAddDependentService } from './@core/services/modal-add-dependent/modal-add-dependent-service';
import { ValidateCPFService } from './@core/services/utils/validatecpf.service';
import { DependentService } from './@core/services/dependents/dependent.service';
import { CPFMaskService } from './@core/services/utils/cpfmask.service';
import { DateUtilService } from './@core/services/utils/date.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule
  ],
  providers: [
    AuthGuard,
    LoginGuard,
    AuthenticationService,
    ModalAlertService,
    PatientDataService,
    LoadingService,
    CalledService,
    ModalAddDependentService,
    ValidateCPFService,
    DependentService,
    CPFMaskService,
    DateUtilService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MenuService,
    CalledService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
