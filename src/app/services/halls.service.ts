import {Injectable} from '@angular/core';
import {GenericItemService} from "./generic-item.service";
import {SnackBarService} from "./snack-bar.service";
import {HallsControllerService} from "./controllers/halls-controller.service";
import {Hall} from "../models/hall";

@Injectable({
  providedIn: 'root'
})
export class HallsService extends GenericItemService<Hall> {

  constructor(protected _controller: HallsControllerService, protected _snackBarService: SnackBarService) {
    super(_controller, _snackBarService)
  }
}
