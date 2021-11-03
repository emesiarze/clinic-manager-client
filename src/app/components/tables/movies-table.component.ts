import {Component} from '@angular/core';
import {GenericTableComponent} from "../generic-table/generic-table.component";
import {Movie} from "../../models/movie";
import {Identifiable} from "../../models/Identifiable";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-movies-table',
  templateUrl: '../generic-table/generic-table.component.html',
  styleUrls: ['../generic-table/generic-table.component.scss']
})
export class MoviesTableComponent extends GenericTableComponent<Movie>{

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
        defName: 'title',
        displayName: 'Tytuł',
        propertyName: 'title',
      },
      {
        defName: 'director',
        displayName: 'Reżyser',
        propertyName: 'director',
      },
      {
        defName: 'duration',
        displayName: 'Czas trwania',
        propertyName: 'duration',
        formatter: (duration: number) => `${duration} min`
      },
    ];

    this._actionsDefinitions = [
      {
        icon: 'edit',
        action: (item: Identifiable) => {
          this.emitEdit(item as Movie);
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
}
