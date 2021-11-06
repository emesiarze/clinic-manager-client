import {Injectable} from "@angular/core";
import {GenericControllerService} from "./generic-controller.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Reservation} from "../../models/reservation";
import {Observable} from "rxjs";
import {CommonResponse} from "../../models/response";

@Injectable({
  providedIn: 'root'
})
export class ReservationsControllerService extends GenericControllerService<Reservation> {
  protected _endpointUrl = 'reservations';

  constructor(http: HttpClient) {
    super(http);
  }

  getAllReservationsBySeanse(seanseId: string): Observable<CommonResponse<Reservation[]>> {
    const params = new HttpParams().appendAll({ seanseId: seanseId });
    return this._http.get<CommonResponse<Reservation[]>>(`/api/${this._endpointUrl}/allBySeanse`, { params: params });
  }
}
