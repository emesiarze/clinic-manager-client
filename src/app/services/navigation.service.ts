import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private _router: Router, private _authService: AuthService) {
  }

  //#region Navigation
  public navigateTo<T>(path: string, data?: T): void {
    this._router.navigate([`/${path}`], { state: { data: data }});
  }

  public navigateToHomeScreen(): void {
    this._authService.isAdmin()
      ? this._router.navigate(['/manage-users'])
      : this._router.navigate(['/profile-details']);
  }

  public navigateToLoginScreen(): void {
    this._router.navigate(['/login']);
  }
}
