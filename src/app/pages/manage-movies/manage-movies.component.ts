import {Component, OnInit} from '@angular/core';
import {GenericDataSource} from "../../models/generic-data-source";
import {MatDialog} from "@angular/material/dialog";
import {filter, switchMap, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {ItemDetailsData} from "../../models/item-details-data";
import {MoviesService} from "../../services/movies.service";
import {Movie} from "../../models/movie";
import {MovieDetailsComponent} from "../../components/movie-details/movie-details.component";

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
    this.openDialogAndWaitForClosure(false, movie).pipe(
      filter(value => !!value),
      tap(() => this._requestCount++),
      switchMap(movie => this._moviesService.updateItem(movie)),
      tap(() => this._requestCount--),
      filter(value => !!value),
      tap(() => this.loadData())
    ).subscribe()
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
    this.openDialogAndWaitForClosure().pipe(
      filter(value => !!value),
      tap(() => this._requestCount++),
      switchMap(movie => this._moviesService.addItem(movie)),
      tap(() => this._requestCount--),
      filter(value => !!value),
      tap(() => this.loadData())
    ).subscribe()
  }

  private openDialogAndWaitForClosure(create = true, movie?: Movie): Observable<any> {
    return this._dialogService.open(MovieDetailsComponent, {
      data: {
        create: create,
        item: movie
      } as ItemDetailsData<Movie>,
      width: '50vw',
      maxHeight: '90vh'
    }).afterClosed()
  }
  // endregion
}
