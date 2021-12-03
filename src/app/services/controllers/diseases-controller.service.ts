import {Injectable} from "@angular/core";
import {GenericControllerService} from "./generic-controller.service";
import {HttpClient} from "@angular/common/http";
import {Disease} from "../../models/disease";

@Injectable({
  providedIn: 'root'
})
export class DiseasesControllerService extends GenericControllerService<Disease> {
  protected _endpointUrl = 'diseases';

  constructor(http: HttpClient) {
    super(http);
  }
}
