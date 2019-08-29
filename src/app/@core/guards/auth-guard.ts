import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication/login.service';
import { MenuService } from '../services/header/menu.service';
import { Routes } from '../consts/routes/routes.const';

@Injectable()
export class AuthGuard implements CanActivate {

    private routes: Array<string>;

    constructor(
        private _router: Router,
        private _menuService: MenuService,
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
            this._menuService.activeMenu(this.routes);
            return true;
        } else {
            this._router.navigate([Routes.login]);
        }
        return false;
    }

    /**
     * Método responsavel por validar se há usuário logado no sistema
     */
    private validUser(): boolean {
        const user = this._authenticationService.getCurrentUser();
        return user ? true : false;
    }

}