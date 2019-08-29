import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './@core/guards/auth-guard';
import { LoginGuard } from './@core/guards/login-guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule',
    canActivate: [LoginGuard]
  },
  {
    path: 'meu-einstein-suporte',
    loadChildren: './modules/me-support/me-support.module#MESupportModule',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
