import {Injectable} from "@angular/core";
import {GenericControllerService} from "./generic-controller.service";
import {HttpClient} from "@angular/common/http";
import {Movie} from "../../models/movie";

@Injectable({
  providedIn: 'root'
})
export class MoviesControllerService extends GenericControllerService<Movie> {
  protected _endpointUrl = 'movies';

  constructor(http: HttpClient) {
    super(http);
  }
}
