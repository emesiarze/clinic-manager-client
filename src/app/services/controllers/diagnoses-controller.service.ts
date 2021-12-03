import {Injectable} from "@angular/core";
import {GenericControllerService} from "./generic-controller.service";
import {Diagnose} from "../../models/diagnose";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DiagnosesControllerService extends GenericControllerService<Diagnose> {
  protected _endpointUrl = 'diagnoses';

  constructor(http: HttpClient) {
    super(http);
  }
}
