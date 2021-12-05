import {Injectable} from "@angular/core";
import {GenericControllerService} from "./generic-controller.service";
import {Diagnose} from "../../models/diagnose";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommonResponse} from "../../models/response";

@Injectable({
  providedIn: 'root'
})
export class DiagnosesControllerService extends GenericControllerService<Diagnose> {
  protected _endpointUrl = 'diagnoses';

  constructor(http: HttpClient) {
    super(http);
  }

  public getSingleDiagnose(id: number): Observable<CommonResponse<Diagnose[]>> {
    const params = new HttpParams().appendAll({ id: id });
    return this._http.get<CommonResponse<Diagnose[]>>(`/api/${this._endpointUrl}`, { params: params});
  }

  public getAllUserDiagnoses(userId: string): Observable<CommonResponse<Diagnose[]>> {
    const params = new HttpParams().appendAll({ userId: userId });
    return this._http.get<CommonResponse<Diagnose[]>>(`/api/${this._endpointUrl}/user`, { params: params});
  }

  public diagnose(diagnose: Diagnose): Observable<CommonResponse<Diagnose>> {
    return this._http.post<CommonResponse<Diagnose>>(`/api/${this._endpointUrl}/diagnose`, diagnose);
  }
}
