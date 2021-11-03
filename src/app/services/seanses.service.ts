import {Injectable} from '@angular/core';
import {GenericItemService} from "./generic-item.service";
import {Seanse} from "../models/seanse";
import {SnackBarService} from "./snack-bar.service";
import {SeansesControllerService} from "./controllers/seanses-controller.service";

@Injectable({
  providedIn: 'root'
})
export class SeansesService extends GenericItemService<Seanse> {

  constructor(protected _controller: SeansesControllerService, protected _snackBarService: SnackBarService) {
    super(_controller, _snackBarService)
  }
}
