import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Movie} from "../../models/movie";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ItemDetailsData} from "../../models/item-details-data";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  private _form: FormGroup;
  private readonly _create: boolean;
  private _movie?: Movie;

  constructor(private _fb: FormBuilder,
              private _dialog: MatDialogRef<MovieDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) data: ItemDetailsData<Movie>) {
    this._create = data.create;
    this._movie = data.item;
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
    console.log(this._movie)
    return this._fb.group({
      title: [this._movie?.title || undefined, [Validators.required]],
      director: [this._movie?.director || undefined, [Validators.required]],
      duration: [this._movie?.duration || undefined, [Validators.required]],
    });
  }

  private parseForm(): Movie {
    return {
      id: this._movie?.id,
      title: this._form.get('title')?.value,
      director: this._form.get('director')?.value,
      duration: this._form.get('duration')?.value
    } as Movie;
  }

  public onSubmit(): void {
    const movie = this.parseForm();

    this._dialog.close(movie)
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
