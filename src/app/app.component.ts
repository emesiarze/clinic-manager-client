import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _authService: AuthService, private _loginService: LoginService) { }

  public isLoggedIn(): boolean {
    return this._authService.isLoggedIn();
  }

  public isAdmin(): boolean {
    return this._authService.isAdmin();
  }

  public logout(): void {
    this._loginService.logOut();
  }
}
