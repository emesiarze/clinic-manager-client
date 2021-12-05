import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SymptomsService} from "../../services/symptoms.service";
import {Symptom} from "../../models/symptom";
import {DiagnosesService} from "../../services/diagnoses.service";
import {Diagnose} from "../../models/diagnose";
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-create-diagnose',
  templateUrl: './create-diagnose.component.html',
  styleUrls: ['./create-diagnose.component.scss']
})
export class CreateDiagnoseComponent implements OnInit {
  private _patient: User;
  private _selectedSymptoms: Symptom[] = [];

  constructor(private _dialog: MatDialogRef<CreateDiagnoseComponent>,
              @Inject(MAT_DIALOG_DATA) patient: User,
              private _symptomsService: SymptomsService,
              private _diagnoseService: DiagnosesService,
              private _authService: AuthService
  ) {
    this._patient = patient
  }

  ngOnInit(): void { }

  public closeDialog(): void {
    this._dialog.close(null);
  }

  public updateSymptoms(symptoms: Symptom[]): void {
    this._selectedSymptoms = symptoms;
  }

  public diagnose(): void {
    const diagnose: Diagnose = {
      patient: this._patient,
      doctor: this._authService.user,
      symptomsExperienced: this._selectedSymptoms
    } as Diagnose;

    this._diagnoseService.diagnose(diagnose).pipe(
      tap(diagnose => this._dialog.close(diagnose))
    ).subscribe()
  }
}
