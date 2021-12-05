import {Injectable} from '@angular/core';
import {GenericItemService} from "./generic-item.service";
import {SnackBarService} from "../snack-bar.service";
import {Disease} from "../../models/disease";
import {DiseasesControllerService} from "../controllers/diseases-controller.service";

@Injectable({
  providedIn: 'root'
})
export class DiseasesService extends GenericItemService<Disease> {

  constructor(protected _controller: DiseasesControllerService, protected _snackBarService: SnackBarService) {
    super(_controller, _snackBarService)
  }
}
