import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {NavigationService} from "./navigation.service";
import {AuthService} from "./auth.service";
import {SnackBarService} from "./snack-bar.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private _navigator: NavigationService,
    private _authService: AuthService,
    private _snackBarService: SnackBarService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._authService.isAdmin()) {
      return true;
    } else {
      this._snackBarService.openErrorSnackBar('Brak odpowiednich uprawnień.')
      this._navigator.navigateToHomeScreen();
      return false;
    }
  }
}
