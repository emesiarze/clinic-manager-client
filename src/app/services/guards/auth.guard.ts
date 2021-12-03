import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {NavigationService} from "../navigation.service";
import {AuthService} from "../auth.service";
import {SnackBarService} from "../snack-bar.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _navigator: NavigationService,
    private _authService: AuthService,
    private _snackBarService: SnackBarService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._authService.isLoggedIn()) {
      return true;
    } else {
      this._snackBarService.openErrorSnackBar('Użytkownik nie jest zalogowany.')
      this._navigator.navigateToLoginScreen();
      return false;
    }
  }
}
