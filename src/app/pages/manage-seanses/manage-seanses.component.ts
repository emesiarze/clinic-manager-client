import {Component, OnInit} from '@angular/core';
import {GenericDataSource} from "../../models/generic-data-source";
import {Seanse} from "../../models/seanse";
import {SeansesService} from "../../services/seanses.service";
import {MatDialog} from "@angular/material/dialog";
import {filter, tap} from "rxjs/operators";

@Component({
  selector: 'app-manage-seanses',
  templateUrl: './manage-seanses.component.html',
  styleUrls: ['./manage-seanses.component.scss']
})
export class ManageSeansesComponent implements OnInit {
  private _dataSource = new GenericDataSource<Seanse>([]);
  private _requestCount = 0;

  constructor(private _seansesService: SeansesService, private _dialogService: MatDialog) {
  }

  get dataSource(): GenericDataSource<Seanse> {
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
    this._seansesService.getAllItems().pipe(
      tap(() => this._requestCount--),
      filter(items => !!items),
      tap(items => this._dataSource.data.next(items!))
    ).subscribe();
  }

  // region Item modifications
  public onEditItem(seanse: Seanse) {
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
  }
  // endregion
}
