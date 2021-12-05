import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Diagnose} from "../../models/diagnose";
import {TranslatePipe} from "../../helpers/translate.pipe";
import {Disease} from "../../models/disease";

@Component({
  selector: 'app-diagnose-details',
  templateUrl: './diagnose-details.component.html',
  styleUrls: ['./diagnose-details.component.scss']
})
export class DiagnoseDetailsComponent implements OnInit {
  readonly _diagnose: Diagnose;
  private _translatePipe: TranslatePipe;
  private _form: FormGroup;

  constructor(
    private _dialog: MatDialogRef<DiagnoseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) data: Diagnose,
    private _fb: FormBuilder
  ) {
    this._diagnose = data;
  }

  get form(): FormGroup {
    return this._form;
  }

  get diagnose(): Diagnose | undefined {
    return this._diagnose;
  }

  ngOnInit(): void {
    this._translatePipe = new TranslatePipe();
    this._form = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this._fb.group({
      patient: { value: this._diagnose.patient.fullName || undefined, disabled: true },
      doctor: { value: this._diagnose.doctor.fullName || undefined, disabled: true },
      disease: { value: this.translateDisease(this._diagnose.disease), disabled: true },
      symptomsExperienced: this._fb.array(this._diagnose.symptomsExperienced ? this._diagnose?.symptomsExperienced : []),
      diagnoseDate: { value: this._diagnose.diagnoseDate || undefined, disabled: true }
    })
  }

  private translateDisease(disease: Disease): string {
    const name = disease.name
    return this._translatePipe.transform(name);
  }

  public closeDialog(): void {
    this._dialog.close(null);
  }
}
