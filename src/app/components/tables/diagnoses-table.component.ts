import {Component} from '@angular/core';
import {GenericTableComponent} from "../generic-table/generic-table.component";
import {Diagnose} from "../../models/diagnose";
import {AuthService} from "../../services/auth.service";
import {Symptom} from "../../models/symptom";
import {Disease} from "../../models/disease";
import {TranslatePipe} from "../../helpers/translate.pipe";

@Component({
  selector: 'app-diagnoses-table',
  templateUrl: '../generic-table/generic-table.component.html',
  styleUrls: ['../generic-table/generic-table.component.scss']
})
export class DiagnosesTableComponent extends GenericTableComponent<Diagnose>{

  constructor(private _authService: AuthService) {
    super();
    const _translatePipe = new TranslatePipe()
    this._columnsDefinitions = [
      {
        defName: 'disease',
        displayName: 'Choroba',
        propertyName: 'disease',
        formatter: (disease: Disease) => _translatePipe.transform(disease.name)
      },
      {
        defName: 'symptoms',
        displayName: 'Ilość występujących objawów',
        propertyName: 'symptomsExperienced',
        formatter: (symptoms: Symptom[]) => `${symptoms.length}`
      },
      {
        defName: 'diagnoseDate',
        displayName: 'Data zdiagnozowania',
        propertyName: 'diagnoseDate',
        formatter: (date: Date) => new Date(date).toLocaleString('pl-PL')
      }
    ];

    this._actionsDefinitions = []
  }
}
