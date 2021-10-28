import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {CommonResponse} from "../../models/response";
import {User} from "../../models/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginControllerService {
  private readonly loginUrl = `/api/auth`

  constructor(private _http: HttpClient) { }

  login(login: string, password: string): Observable<CommonResponse<User>> {
    const params = new HttpParams().appendAll({
      login: login,
      password: password
    });

    return this.sendLoginRequest(params);
  }

  private sendLoginRequest(params: HttpParams): Observable<CommonResponse<User>> {
    return this._http.get<CommonResponse<User>>(this.loginUrl, { params: params });
  }
}
