import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../../consts/environment/api.const';
import { LoginModel } from '../../models/login/login.model';
import { UserModel } from '../../models/login/user.model';
import { GrantType } from '../../consts/authentication/grantType.const';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  /**
   * Método responsável por logar no sistema, utilizando o gateway de authentication do Imunização.
   * @param login Model com usuário, senha.
   */
  public authenticate(login: LoginModel): Observable<UserModel> {
    login.grantType = GrantType.grantType;

    const header = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post<UserModel>(API.authentication + '/api/account/login', login, { headers: header });
  }

  /**
   * Método responsável por atualizar o token de acesso.
   * @param login Model apenas com o refresh token, que é utilizado para renovar o token de acesso.
   */
  public refreshAuthentication(login: LoginModel): Observable<UserModel> {
    login.grantType = 'refresh';

    const header = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post<UserModel>(API.authentication + '/api/account/login', login, { headers: header });
  }

  /**
   * Método responsável por buscar o usuário logado atualmente no sistema.
   */
  public getCurrentUser(): UserModel {
    try {
      return JSON.parse(localStorage.getItem('user')) as UserModel;
    } catch (err) {
      this._router.navigateByUrl('login');
    }
  }

  /**
   * Método responsável por definir o usuário logado no sistema.
   * @param user Model de usuário contendo access token, nome do usuário e refresh token.
   */
  public setCurrentUser(user: UserModel): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Remove o usuário atualmente logado.
   */
  public removeCurrentUser(): void {
    localStorage.removeItem('user');
  }
}
