import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {User} from "../../models/user";
import {filter, switchMap, tap} from "rxjs/operators";
import {GenericDataSource} from "../../models/generic-data-source";
import {MatDialog} from "@angular/material/dialog";
import {PatientModificationDialogComponent} from "../../components/patient-modification-dialog/patient-modification-dialog.component";
import {ItemDetailsData} from "../../models/item-details-data";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {NavigationService} from "../../services/navigation.service";
import {DiagnosesService} from "../../services/diagnoses.service";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  private _dataSource = new GenericDataSource<User>([]);
  private _requestCount = 0;

  constructor(private _usersService: UsersService,
              private _dialogService: MatDialog,
              private _diagnosesService: DiagnosesService,
              private _authService: AuthService,
              private _navigator: NavigationService) { }

  get dataSource(): GenericDataSource<User> {
    return this._dataSource;
  }

  get isLoading(): boolean {
    return this._requestCount > 0;
  }

  get isDoctor(): boolean {
    return this._authService.isDoctor();
  }

  get isAdmin(): boolean {
    return this._authService.isAdmin();
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this._requestCount++;
    (this.isAdmin
      ? this._usersService.getAllItems()
      : this._usersService.getAllPatients()
    ).pipe(
      tap(() => this._requestCount--),
      filter(items => !!items),
      tap(items => this._dataSource.data.next(items!))
    ).subscribe();
  }

  // region Item modifications
  public onEditItem(user: User) {
    this.openDialogAndWaitForClosure(false, user).pipe(
      filter(value => !!value),
      tap(() => this._requestCount++),
      switchMap(user => this._usersService.updateItem(user)),
      tap(() => this._requestCount--),
      filter(value => !!value),
      tap(() => this.loadData())
    ).subscribe()
  }

  public onDeleteItem(id: string) {
    this._usersService.deleteItem(id).pipe(
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
        switchMap(user => this._usersService.addItem(user)),
        tap(() => this._requestCount--),
        filter(value => !!value),
        tap(() => this.loadData())
    ).subscribe()
  }

  private openDialogAndWaitForClosure(create = true, user?: User): Observable<any> {
    return this._dialogService.open(PatientModificationDialogComponent, {
      data: {
        create: create,
        item: user
      } as ItemDetailsData<User>,
      width: '50vw',
      maxHeight: '90vh'
    }).afterClosed()
  }

  public navigateToUserDetails(user: User): void {
    if (this.isDoctor) {
      this._diagnosesService.selectedUser = user
      this._navigator.navigateToUserDetails(user);
    }
  }
  // endregion
}
