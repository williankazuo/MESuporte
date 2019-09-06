import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeSupportComponent } from './me-support.component';
import { HomeCalledComponent } from 'src/app/pages/home-called/home-called.component';
import { NewCalledComponent } from 'src/app/pages/new-called/new-called.component';
import { EndedCallsComponent } from 'src/app/pages/ended-calls/ended-calls.component';
import { AuthGuard } from 'src/app/@core/guards/auth-guard';

const routes: Routes = [
    {
        path: '',
        component: MeSupportComponent,
        children: [
            // {
            //     path: 'inicio',
            //     component: HomeCalledComponent,
            //     canActivate: [AuthGuard]
            // },
            // {
            //     path: 'inicio/:id',
            //     component: HomeCalledComponent,
            //     canActivate: [AuthGuard]
            // },
            {
                path: 'novo-chamado',
                component: NewCalledComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'novo-chamado/:id',
                component: NewCalledComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'chamados-finalizados',
                component: EndedCallsComponent,
                canActivate: [AuthGuard]
            }
        ]

    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MESupportRouting { }