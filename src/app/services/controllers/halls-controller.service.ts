import {Injectable} from "@angular/core";
import {GenericControllerService} from "./generic-controller.service";
import {Hall} from "../../models/hall";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HallsControllerService extends GenericControllerService<Hall> {
  protected _endpointUrl = 'halls';

  constructor(http: HttpClient) {
    super(http);
  }
}
