import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  /*
  * Variable responsible for passing user to patient details view */
  public selectedPatient: User;

  constructor(private _router: Router, private _authService: AuthService) { }

  //#region Navigation
  public navigateTo<T>(path: string, data?: T): void {
    this._router.navigate([`/${path}`], { state: { data: data }});
  }

  public navigateToHomeScreen(): void {
    this._authService.isAdminOrDoctor()
      ? this._router.navigate(['/manage-users'])
      : this._router.navigate(['/patient-details'])
  }

  public navigateToLoginScreen(): void {
    this._router.navigate(['/login']);
  }

  public navigateToUserDetails(): void {
    this.navigateTo('patient-details');
  }
}
