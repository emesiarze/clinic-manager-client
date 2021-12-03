import {Injectable} from '@angular/core';
import {GenericItemService} from "./generic-item.service";
import {Diagnose} from "../models/diagnose";
import {SnackBarService} from "./snack-bar.service";
import {DiagnosesControllerService} from "./controllers/diagnoses-controller.service";

@Injectable({
  providedIn: 'root'
})
export class SeansesService extends GenericItemService<Diagnose> {

  constructor(protected _controller: DiagnosesControllerService, protected _snackBarService: SnackBarService) {
    super(_controller, _snackBarService)
  }
}
