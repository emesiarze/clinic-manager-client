import {Injectable} from '@angular/core';
import {GenericItemService} from "./generic-item.service";
import {SnackBarService} from "../snack-bar.service";
import {SymptomsControllerService} from "../controllers/symptoms-controller.service";
import {Symptom} from "../../models/symptom";

@Injectable({
  providedIn: 'root'
})
export class SymptomsService extends GenericItemService<Symptom> {

  constructor(protected _controller: SymptomsControllerService, protected _snackBarService: SnackBarService) {
    super(_controller, _snackBarService)
  }
}
