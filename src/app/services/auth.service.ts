import { Injectable } from '@angular/core';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user?: User = undefined;

  constructor() { }

  get user(): User | undefined {
    return this._user;
  }

  public logIn(user: User): void {
    this._user = user;
  }

  public logOut(): void {
    this._user = undefined;
  }
}
