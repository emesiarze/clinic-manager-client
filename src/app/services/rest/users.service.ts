import {Injectable} from '@angular/core';
import {GenericItemService} from "./generic-item.service";
import {User} from "../../models/user";
import {SnackBarService} from "../snack-bar.service";
import {UsersControllerService} from "../controllers/users-controller.service";
import {Observable, of} from "rxjs";
import {CommonResponse} from "../../models/response";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService extends GenericItemService<User> {

  constructor(protected _controller: UsersControllerService, protected _snackBarService: SnackBarService) {
    super(_controller, _snackBarService)
  }

  public getAllPatients(): Observable<User[] | null> {
    return this._controller.getAllPatients().pipe(
      map((result: CommonResponse<User[]>) => {
        const data = result.data;
        !result.isSuccess ? this.handleResponseFailed(result.errorMessage) : {};
        return data;
      }),
      catchError((err) => {
        this.handleDefaultError(err);
        return of(null);
      }),
    );
  }
}
