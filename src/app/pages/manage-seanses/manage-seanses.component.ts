import {Component, OnInit} from '@angular/core';
import {GenericDataSource} from "../../models/generic-data-source";
import {Seanse} from "../../models/seanse";
import {SeansesService} from "../../services/seanses.service";
import {MatDialog} from "@angular/material/dialog";
import {filter, switchMap, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {ItemDetailsData} from "../../models/item-details-data";
import {SeanseDetailsComponent} from "../../components/seanse-details/seanse-details.component";
import {AuthService} from "../../services/auth.service";
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-manage-seanses',
  templateUrl: './manage-seanses.component.html',
  styleUrls: ['./manage-seanses.component.scss']
})
export class ManageSeansesComponent implements OnInit {
  private _dataSource = new GenericDataSource<Seanse>([]);
  private _requestCount = 0;

  constructor(private _seansesService: SeansesService,
              private _dialogService: MatDialog,
              private _authService: AuthService,
              private _navigator: NavigationService) {
  }

  get dataSource(): GenericDataSource<Seanse> {
    return this._dataSource;
  }

  get isLoading(): boolean {
    return this._requestCount > 0;
  }

  get isAdmin(): boolean {
    return this._authService.isAdmin();
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this._requestCount++;
    this._seansesService.getAllItems().pipe(
      tap(() => this._requestCount--),
      filter(items => !!items),
      tap(items => this._dataSource.data.next(items!))
    ).subscribe();
  }

  // region Item modifications
  public onClickItem(item: Seanse) {
    this.isAdmin
      ? this.onEditItem(item)
      : this. _navigator.navigateTo<Seanse>('reservation', item)
  }

  public onEditItem(seanse: Seanse) {
    this.openDialogAndWaitForClosure(false, seanse).pipe(
      filter(value => !!value),
      tap(() => this._requestCount++),
      switchMap(seanse => this._seansesService.updateItem(seanse)),
      tap(() => this._requestCount--),
      filter(value => !!value),
      tap(() => this.loadData())
    ).subscribe()
  }

  public onDeleteItem(id: string) {
    this._seansesService.deleteItem(id).pipe(
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
      switchMap(seanse => this._seansesService.addItem(seanse)),
      tap(() => this._requestCount--),
      filter(value => !!value),
      tap(() => this.loadData())
    ).subscribe()
  }

  private openDialogAndWaitForClosure(create = true, seanse?: Seanse): Observable<any> {
    return this._dialogService.open(SeanseDetailsComponent, {
      data: {
        create: create,
        item: seanse
      } as ItemDetailsData<Seanse>,
      width: '50vw',
      maxHeight: '90vh'
    }).afterClosed()
  }
  // endregion
}
