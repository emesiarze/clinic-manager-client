import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private _router: Router) {
  }

  //#region Navigation
  public navigateTo(path: string): void {
    this._router.navigate([`/${path}`]);
  }

  public navigateToHomeScreen(): void {
    this._router.navigate(['/manage-users']);
  }

  public navigateToLoginScreen(): void {
    this._router.navigate(['/login']);
  }
}
