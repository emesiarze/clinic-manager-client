import {Component} from '@angular/core';
import {GenericTableComponent} from "../generic-table/generic-table.component";
import {Diagnose} from "../../models/diagnose";
import {AuthService} from "../../services/auth.service";
import {Identifiable} from "../../models/Identifiable";
import {Symptom} from "../../models/symptom";
import {Disease} from "../../models/disease";

@Component({
  selector: 'app-seanses-table',
  templateUrl: '../generic-table/generic-table.component.html',
  styleUrls: ['../generic-table/generic-table.component.scss']
})
export class SeansesTableComponent extends GenericTableComponent<Diagnose>{

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
        defName: 'movie',
        displayName: 'Film',
        propertyName: 'movie',
        formatter: (movie: Disease) => movie.title
      },
      {
        defName: 'hall',
        displayName: 'Sala',
        propertyName: 'hall',
        formatter: (hall: Symptom) => hall.name
      },
      {
        defName: 'startTime',
        displayName: 'Czas rozpoczęcia',
        propertyName: 'startTime',
        formatter: (date: Date) => new Date(date).toLocaleString('pl-PL')
      }
    ];

    this._actionsDefinitions = [
      {
        icon: 'edit',
        action: (item: Identifiable) => {
          this.emitEdit(item as Diagnose);
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
