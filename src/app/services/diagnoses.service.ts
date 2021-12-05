import {Injectable} from '@angular/core';
import {GenericItemService} from "./generic-item.service";
import {Diagnose} from "../models/diagnose";
import {SnackBarService} from "./snack-bar.service";
import {DiagnosesControllerService} from "./controllers/diagnoses-controller.service";
import {Observable, of} from "rxjs";
import {CommonResponse} from "../models/response";
import {catchError, map} from "rxjs/operators";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class DiagnosesService extends GenericItemService<Diagnose> {
  public selectedUser: User;

  constructor(protected _controller: DiagnosesControllerService, protected _snackBarService: SnackBarService) {
    super(_controller, _snackBarService)
  }

  public getAllUserDiagnoses(userId: string): Observable<Diagnose[] | null> {
    return this._controller.getAllUserDiagnoses(userId).pipe(
      map((result: CommonResponse<Diagnose[]>) => {
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

  public diagnose(diagnose: Diagnose): Observable<Diagnose | null> {
    return this._controller.diagnose(diagnose).pipe(
      map((result: CommonResponse<Diagnose>) => {
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
