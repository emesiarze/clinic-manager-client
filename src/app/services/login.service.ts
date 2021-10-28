import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {CommonResponse} from '../models/response';
import {User} from '../models/user';
import {AuthService} from "./auth.service";
import {LoginControllerService} from "./controllers/login-controller.service";
import {empty} from "rxjs/internal/Observer";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _authService: AuthService,
              private _loginController: LoginControllerService) { }

  login(login: string, password: string): void {
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

  private sendLoginRequest(params: HttpParams): Observable<CommonResponse<User>> {
    return this._http.get<CommonResponse<User>>(this.loginUrl, { params: params });
  }

  private handleLoginSuccess(user: User): void {
    this._authService.logIn(user);
  }

  private handleLoginFailed(error: string): void {
    this.handleDefaultError(error);
  }

  private handleDefaultError(error: string): void {
    console.error(error);
  }
}
