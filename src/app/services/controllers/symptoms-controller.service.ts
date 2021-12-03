import {Injectable} from "@angular/core";
import {GenericControllerService} from "./generic-controller.service";
import {Symptom} from "../../models/symptom";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SymptomsControllerService extends GenericControllerService<Symptom> {
  protected _endpointUrl = 'symptoms';

  constructor(http: HttpClient) {
    super(http);
  }
}
