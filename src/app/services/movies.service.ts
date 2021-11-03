import {Injectable} from '@angular/core';
import {GenericItemService} from "./generic-item.service";
import {SnackBarService} from "./snack-bar.service";
import {Movie} from "../models/movie";
import {MoviesControllerService} from "./controllers/movies-controller.service";

@Injectable({
  providedIn: 'root'
})
export class MoviesService extends GenericItemService<Movie> {

  constructor(protected _controller: MoviesControllerService, protected _snackBarService: SnackBarService) {
    super(_controller, _snackBarService)
  }
}
