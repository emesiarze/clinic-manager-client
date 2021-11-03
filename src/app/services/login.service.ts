import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {CommonResponse} from '../models/response';
import {User} from '../models/user';
import {AuthService} from "./auth.service";
import {LoginControllerService} from "./controllers/login-controller.service";
import {empty} from "rxjs/internal/Observer";
import {SnackBarService} from "./snack-bar.service";
import {NavigationService} from "./navigation.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _authService: AuthService,
              private _loginController: LoginControllerService,
              private _snackBarService: SnackBarService,
              private _navigator: NavigationService) { }

  public login(login: string, password: string): void {
    this._loginController.login(login, password).pipe(
      tap((result: CommonResponse<User>) => {
        const user = result.data;
        result.isSuccess ? this.handleLoginSuccess(user) : this.handleLoginFailed(result.errorMessage);
      }),
      catchError(err => {
        this.handleDefaultError(err);
        return of(empty);
      })
    ).subscribe();
  }

  public doesLoginExists(login: string): Observable<boolean> {
    return this._loginController.doesLoginExists(login).pipe(
      map((response: CommonResponse<string>) => {
        return response.data !== 'not_exists';
      })
    )
  }

  public logout(): void {
    this._authService.logOut();
    this._navigator.navigateToLoginScreen();
  }

  private handleLoginSuccess(user: User): void {
    this._authService.logIn(user);
    this._navigator.navigateToHomeScreen();
  }

  private handleLoginFailed(error: string): void {
    this._snackBarService.openErrorSnackBar('Błedny login lub hasło');
    console.error(error);
  }

  private handleDefaultError(error: string): void {
    this._snackBarService.openErrorSnackBar('Wystąpił błąd', error);
  }
}
