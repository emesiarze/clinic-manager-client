import {Injectable} from "@angular/core";
import {GenericControllerService} from "./generic-controller.service";
import {Seanse} from "../../models/seanse";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SeansesControllerService extends GenericControllerService<Seanse> {
  protected _endpointUrl = 'seanses';

  constructor(http: HttpClient) {
    super(http);
  }
}
