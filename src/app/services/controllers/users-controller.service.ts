import {Injectable} from "@angular/core";
import {GenericControllerService} from "./generic-controller.service";
import {User} from "../../models/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommonResponse} from "../../models/response";

@Injectable({
  providedIn: 'root'
})
export class UsersControllerService extends GenericControllerService<User> {
  protected _endpointUrl = 'users';

  constructor(http: HttpClient) {
    super(http);
  }

  public getAllPatients(): Observable<CommonResponse<User[]>> {
    return this._http.get<CommonResponse<User[]>>(`/api/${this._endpointUrl}/patients`);
  }
}
