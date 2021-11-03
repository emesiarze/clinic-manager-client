import { Component, OnInit } from '@angular/core';
import {GenericDataSource} from "../../models/generic-data-source";
import {Hall} from "../../models/hall";
import {HallsService} from "../../services/halls.service";
import {MatDialog} from "@angular/material/dialog";
import {filter, switchMap, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {ItemDetailsData} from "../../models/item-details-data";
import {HallDetailsComponent} from "../../components/hall-details/hall-details.component";

@Component({
  selector: 'app-manage-halls',
  templateUrl: './manage-halls.component.html',
  styleUrls: ['./manage-halls.component.scss']
})
export class ManageHallsComponent implements OnInit {
  private _dataSource = new GenericDataSource<Hall>([]);
  private _requestCount = 0;

  constructor(private _hallsService: HallsService, private _dialogService: MatDialog) {
  }

  get dataSource(): GenericDataSource<Hall> {
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
    this._hallsService.getAllItems().pipe(
      tap(() => this._requestCount--),
      filter(items => !!items),
      tap(items => this._dataSource.data.next(items!))
    ).subscribe();
  }

  // region Item modifications
  public onEditItem(hall: Hall) {
    this.openDialogAndWaitForClosure(false, hall).pipe(
      filter(value => !!value),
      tap(() => this._requestCount++),
      switchMap(hall => this._hallsService.updateItem(hall)),
      tap(() => this._requestCount--),
      filter(value => !!value),
      tap(() => this.loadData())
    ).subscribe()
  }

  public onDeleteItem(id: string) {
    this._hallsService.deleteItem(id).pipe(
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
      switchMap(hall => this._hallsService.addItem(hall)),
      tap(() => this._requestCount--),
      filter(value => !!value),
      tap(() => this.loadData())
    ).subscribe()
  }

  private openDialogAndWaitForClosure(create = true, hall?: Hall): Observable<any> {
    return this._dialogService.open(HallDetailsComponent, {
      data: {
        create: create,
        item: hall
      } as ItemDetailsData<Hall>,
      width: '50vw',
      maxHeight: '90vh'
    }).afterClosed()
  }
  // endregion
}
