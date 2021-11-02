import {Injectable} from "@angular/core";
import {GenericControllerService} from "./generic-controller.service";
import {User} from "../../models/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersControllerService extends GenericControllerService<User> {
  protected _endpointUrl = 'users';

  constructor(http: HttpClient) {
    super(http);
  }
}
