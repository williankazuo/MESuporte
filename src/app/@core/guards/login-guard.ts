import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication/login.service';
import { Routes } from '../consts/routes/routes.const';

@Injectable()
export class LoginGuard implements CanActivate {

    private routes: Array<string>;

    constructor(
        private _router: Router,
        private _authenticationService: AuthenticationService
    ) { }

    /**
     * Método responsavel por validar se uma determinada pagina pode ou não ser acessada
     * 
     * @param {ActivatedRouteSnapshot} _next rota que esta sendo analisada
     * @param {RouterStateSnapshot} _state estado da resposta
     */
    canActivate(
        _next: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        window.scrollTo(0, 0);

        this.routes = _state.url.split('/');

        const index = this.routes.indexOf('');
        this.routes.splice(index, 1);

        if (this.validUser()) {
            this.validateLogin(this.routes);
        }
        return true;
    }

    /**
     * Método responsavel por validar se há usuário logado no sistema
     */
    private validUser(): boolean {
        const user = this._authenticationService.getCurrentUser();
        return user ? true : false;
    }

    /**
     * Método responsavel por validar a rota de login. Usuário logado, não poderá acessar a mesma
     * tente via url
     * @param {Array<string>} routes rota que esta querendo ser acessada, parseada
     */
    private validateLogin(routes: Array<string>): void {
        if (routes[0] === Routes.login) {
            this._router.navigate([Routes.home]);
        }
    }

}