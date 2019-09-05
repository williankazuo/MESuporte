import { OptionMenu } from '../../models/header/header.models';
import { Routes } from '../routes/routes.const';

export const Menus: Array<OptionMenu> = [
    // { name: 'Chamado por chat', active: false, route: Routes.home },
    { name: 'Criar novo chamado', active: false, route: Routes.new_called },
    { name: 'Chamados Finalizados', active: false, route: Routes.ended_calls }
];