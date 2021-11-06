import {Injectable} from '@angular/core';
import {GenericItemService} from "./generic-item.service";
import {SnackBarService} from "./snack-bar.service";
import {Observable, of} from "rxjs";
import {Reservation} from "../models/reservation";
import {ReservationsControllerService} from "./controllers/reservations-controller.service";
import {catchError, map} from "rxjs/operators";
import {CommonResponse} from "../models/response";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService extends GenericItemService<Reservation> {

  constructor(protected _controller: ReservationsControllerService, protected _snackBarService: SnackBarService) {
    super(_controller, _snackBarService)
  }

  getAllReservationsBySeanse(seanseId: string): Observable<Reservation[] | null> {
    return this._controller.getAllReservationsBySeanse(seanseId).pipe(
      map((result: CommonResponse<Reservation[]>) => {
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
