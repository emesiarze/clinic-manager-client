import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Diagnose} from "../../models/diagnose";

@Component({
  selector: 'app-diagnose-details',
  templateUrl: './diagnose-details.component.html',
  styleUrls: ['./diagnose-details.component.scss']
})
export class DiagnoseDetailsComponent implements OnInit {
  private _diagnose?: Diagnose;
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
    this._form = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this._fb.group({
      patient: { value: this._diagnose?.patient.fullName || undefined, disabled: true },
      doctor: { value: this._diagnose?.doctor.fullName || undefined, disabled: true },
      disease: { value: this._diagnose?.disease.name || undefined, disabled: true },
      symptomsExperienced: this._fb.array(this._diagnose?.symptomsExperienced ? this._diagnose?.symptomsExperienced : []),
      diagnoseDate: { value: this._diagnose?.diagnoseDate || undefined, disabled: true }
    })
  }

  public closeDialog(): void {
    this._dialog.close(null);
  }
}
