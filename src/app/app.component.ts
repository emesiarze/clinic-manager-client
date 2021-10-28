import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _authService: AuthService) { }

  public isLoggedIn(): boolean {
    return this._authService.isLoggedIn();
  }

  public isAdmin(): boolean {
    return this._authService.isAdmin();
  }
}
