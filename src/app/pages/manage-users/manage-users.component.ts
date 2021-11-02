import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {filter, tap} from "rxjs/operators";
import {GenericDataSource} from "../../models/generic-data-source";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  private _dataSource = new GenericDataSource<User>([]);
  private _requestCount = 0;

  constructor(private _usersService: UserService) { }

  get dataSource(): GenericDataSource<User> {
    return this._dataSource;
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this._requestCount++;
    this._usersService.getAllItems().pipe(
      tap(() => this._requestCount--),
      filter(items => !!items),
      tap(items => this._dataSource.data.next(items!))
    ).subscribe();
  }

  public onItemEdit(item: User) {
  }

  public onItemDelete(id: string) {
    this._usersService.deleteItem(id).pipe(
      tap(() => {
        this._requestCount--;
        this.loadData();
      })
    ).subscribe();
  }

}
