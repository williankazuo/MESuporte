import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/@core/models/login/login.model';
import { AuthenticationService } from 'src/app/@core/services/authentication/login.service';
import { Router } from '@angular/router';
import { ModalAlertService } from 'src/app/@core/services/modal-alert/modal-alert.service';
import { ModalAlert } from 'src/app/@core/models/modal-alert/modal-alert.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public login = new LoginModel();
  public showPassword = false;
  public errorLogin = false;
  public errorMessage: string;

  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _modalAlertService: ModalAlertService
  ) { }

  ngOnInit() {
    this._authenticationService.removeCurrentUser();
  }

  /**
   * Método responsável por logar o usuário no sistema.
   * Em caso de sucesso, definir usuário logado, e navegar para a página principal.
   */
  public authenticate() {
    this._authenticationService.authenticate(this.login).subscribe(response => {
      this.errorLogin = false;
      this._authenticationService.setCurrentUser(response);
      this._router.navigateByUrl('meu-einstein-suporte');
    }, error => {
      if (error.status === 500) {
        this.errorMessage = 'Tivemos um problema. Tente novamente mais tarde.';
      } else if (error.status === 403) {
        this.configureModal();
        this._modalAlertService.openAlertModal();
      } else {
        this.errorMessage = 'Usuário ou senha inválidos.';
      }
      this.errorLogin = true;
    });
  }

  /**
   * Método responsável por configurar o que vai ser exibido no modal de alerta.
   */
  private configureModal() {
    const alertConfig = new ModalAlert();
    alertConfig.title = 'Aviso';
    alertConfig.button1Text = 'OK';
    alertConfig.button1Action = () => {
      this._modalAlertService.closeAlertModal();
    };
    alertConfig.text = 'Você não tem acesso a este sistema.';
    this._modalAlertService.setAlertConfiguration(alertConfig);
  }
}

