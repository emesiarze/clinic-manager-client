import {Component, OnInit} from '@angular/core';
import {GenericDataSource} from "../../models/generic-data-source";
import {MatDialog} from "@angular/material/dialog";
import {filter, tap} from "rxjs/operators";
import {MoviesService} from "../../services/movies.service";
import {Movie} from "../../models/movie";

@Component({
  selector: 'app-manage-movies',
  templateUrl: './manage-movies.component.html',
  styleUrls: ['./manage-movies.component.scss']
})
export class ManageMoviesComponent implements OnInit {
  private _dataSource = new GenericDataSource<Movie>([]);
  private _requestCount = 0;

  constructor(private _moviesService: MoviesService, private _dialogService: MatDialog) {
  }

  get dataSource(): GenericDataSource<Movie> {
    return this._dataSource;
  }

  get isLoading(): boolean {
    return this._requestCount > 0;
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this._requestCount++;
    this._moviesService.getAllItems().pipe(
      tap(() => this._requestCount--),
      filter(items => !!items),
      tap(items => this._dataSource.data.next(items!))
    ).subscribe();
  }

  // region Item modifications
  public onEditItem(movie: Movie) {
  }

  public onDeleteItem(id: string) {
    this._moviesService.deleteItem(id).pipe(
      tap(() => {
        this._requestCount--;
        this.loadData();
      })
    ).subscribe();
  }

  public onAddItem(): void {
  }
  // endregion
}
