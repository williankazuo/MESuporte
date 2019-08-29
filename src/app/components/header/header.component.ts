import { Component, OnInit } from '@angular/core';
import { OptionMenu } from 'src/app/@core/models/header/header.models';
import { MenuService } from 'src/app/@core/services/header/menu.service';
import { AuthenticationService } from 'src/app/@core/services/authentication/login.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/@core/models/login/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public welcome: string;
  public userName: string;
  public menus: Array<OptionMenu>;
  private user: UserModel;

  constructor(
    private _router: Router,
    private _menuService: MenuService,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.userName = '';
    this.user = this._authenticationService.getCurrentUser();

    if (this.user) {
      this.menus = this._menuService.getMenus();
      this.welcome = this._menuService.welcome();
      this.formatterUser(this.user);
    }
  }

  private formatterUser(user: UserModel): void {
    this.userName = user.name.split(' ')[0];
  }

  public logout(): void {
    this._authenticationService.removeCurrentUser();
    this._router.navigate(['/login']);
  }

}
