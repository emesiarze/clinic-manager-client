import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { CommonResponse } from '../models/response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly loginUrl = `/api/auth`

  constructor(private _http: HttpClient) { }

  login(login: string, password: string): void {
    const params = new HttpParams().appendAll({
      login: login,
      password: password
    });

    this.sendLoginRequest(params).pipe(
      tap((result: CommonResponse<User>) => {
        const user = result.data;
        result.isSuccess ? this.handleLoginSuccess(user) : this.handleLoginFailed(result.errorMessage);
      }),
      catchError(err => of(this.handleDefaultError(err)))
    ).subscribe();

  }

  private sendLoginRequest(params: HttpParams): Observable<CommonResponse<User>> {
    return this._http.get<CommonResponse<User>>(this.loginUrl, { params: params });
  }

  private handleLoginSuccess(user: User): void {
    console.log('User', user.fullName, 'logged in.');
  }

  private handleLoginFailed(error: string): void {
    this.handleDefaultError(error);
  }

  private handleDefaultError(error: string): void {
    console.error(error);
  }
}
