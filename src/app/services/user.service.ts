import {Injectable} from '@angular/core';
import {GenericItemService} from "./generic-item.service";
import {User} from "../models/user";
import {SnackBarService} from "./snack-bar.service";
import {UsersControllerService} from "./controllers/users-controller.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericItemService<User> {

  constructor(protected _controller: UsersControllerService, protected _snackBarService: SnackBarService) {
    super(_controller, _snackBarService)
  }
}
