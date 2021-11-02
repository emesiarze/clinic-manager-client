import {Component} from '@angular/core';
import {GenericTableComponent} from "../generic-table/generic-table.component";
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {Identifiable} from "../../models/Identifiable";

@Component({
  selector: 'app-users-table',
  templateUrl: '../generic-table/generic-table.component.html',
  styleUrls: ['../generic-table/generic-table.component.scss']
})
export class UsersTableComponent extends GenericTableComponent<User>{

  constructor(private _authService: AuthService) {
    super();
    this._columnsDefinitions = [
      {
        defName: 'id',
        displayName: 'Identyfikator',
        propertyName: 'id',
        formatter: (id: string) => id.substr(0, 5)
      },
      {
        defName: 'fullName',
        displayName: 'Pełna nazwa',
        propertyName: 'fullName'
      }
    ];

    this._actionsDefinitions = [
      {
        icon: 'edit',
        action: (item: Identifiable) => {
          this.emitEdit(item as User);
        },
        canDisplay: (): boolean => {
          return this._authService.isAdmin();
        },
        color: 'primary',
        tooltip: 'Edytuj'
      },
      {
        icon: 'delete',
        action: (item: Identifiable) => {
          this.emitDelete(item.id);
        },
        canDisplay: (): boolean => {
          return this._authService.isAdmin();
        },
        color: 'warn',
        tooltip: 'Usuń element'
      }
    ]
  }

  ngOnInit(): void {
  }
}
