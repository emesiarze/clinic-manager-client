import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Hall} from "../../models/hall";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ItemDetailsData} from "../../models/item-details-data";

@Component({
  selector: 'app-hall-details',
  templateUrl: './hall-details.component.html',
  styleUrls: ['./hall-details.component.scss']
})
export class HallDetailsComponent implements OnInit {
  private _form: FormGroup;
  private readonly _create: boolean;
  private _hall?: Hall;

  constructor(private _fb: FormBuilder,
              private _dialog: MatDialogRef<HallDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) data: ItemDetailsData<Hall>) {
    this._create = data.create;
    this._hall = data.item;
  }

  get form(): FormGroup {
    return this._form;
  }

  get create(): boolean {
    return this._create;
  }

  ngOnInit(): void {
    this._form = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this._fb.group({
      name: [this._hall?.name || undefined, [Validators.required]],
    });
  }

  private parseForm(): Hall {
    return {
      id: this._hall?.id,
      name: this._form.get('name')?.value,
    } as Hall;
  }

  public onSubmit(): void {
    const hall = this.parseForm();

    this._dialog.close(hall)
  }

  public closeDialog(): void {
    this._dialog.close(null);
  }

  public isValid(controlName: string): boolean {
    return !this.form.get(controlName)?.invalid;
  }

  public getFirstErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) return 'Pole wymagane';
    else return '';
  }
}
