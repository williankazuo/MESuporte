import { Injectable } from '@angular/core';

import { OptionMenu } from '../../models/header/header.models';
import { Menus } from '../../consts/header/header.const';
import { DatePipe } from '@angular/common';

@Injectable()
export class MenuService {

    public menus: Array<OptionMenu> = Menus;

    constructor() { }

    /**
     * Método responsavel por realizar a seleção do menu (deixar algum item de menu ativo de acordo
     * com a rota que esta sendo acessada)
     * @param {Array<string>} _routes
     */
    public activeMenu(_routes: Array<string>): void {
        const routeUrl = _routes.join('/');

        this.menus.forEach((menu: OptionMenu) => {
            menu.route === routeUrl ? menu.active = true : menu.active = false;
        });

        // validação por nivel de menu
        /* this.menus.every((routeMenu: OptionMenu) => {

            const routeFormatter = routeMenu.route.split('/');

            let active: boolean;
            _routes.forEach((routeUrl: string) => {
                active = false;

                routeFormatter.every((menu: string) => {
                    if (routeUrl === menu) {
                        active = true;
                        return !active;
                    }
                    return !active;
                });

            });

            if (active) {
                routeMenu.active = true;
                return !routeMenu.active;
            }

            routeMenu.active = false;
            return !routeMenu.active;
        }); */

    }

    public getMenus(): Array<OptionMenu> {
        return this.menus;
    }

    /**
     * Método responsavel por validar a mensagem de bem vindo que aparecerá acima do
     * nome do usuário no sistema. Validação feita com base na hora do dia.
     */
    public welcome(): string {
        let welcome: string;
        const datePipe = new DatePipe('en-US');
        /* const date = datePipe.transform(new Date(), 'dd/MM/yyyy'); */
        const hour = datePipe.transform(new Date(), 'HH:MM');
        if (hour < '12:00') {
            welcome = 'Bom dia';
        } else {
            if (hour > '11:59' && hour < '18:00') {
                welcome = 'Boa tarde';
            } else {
                welcome = 'Boa noite';
            }
        }
        return `Olá, ${welcome}`;
    }

}
