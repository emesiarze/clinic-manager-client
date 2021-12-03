import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Diagnose} from "../../models/diagnose";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ItemDetailsData} from "../../models/item-details-data";
import {BehaviorSubject, Observable} from "rxjs";
import {DiseasesService} from "../../services/diseases.service";
import {Disease} from "../../models/disease";
import {SymptomsService} from "../../services/symptoms.service";
import {Symptom} from "../../models/symptom";
import {filter, tap} from "rxjs/operators";

@Component({
  selector: 'app-seanse-details',
  templateUrl: './seanse-details.component.html',
  styleUrls: ['./seanse-details.component.scss']
})
export class SeanseDetailsComponent implements OnInit {
  private _form: FormGroup;
  private readonly _create: boolean;
  private _seanse?: Diagnose;
  private readonly _halls$: BehaviorSubject<Symptom[]>;
  private readonly _movies$: BehaviorSubject<Disease[]>;

  constructor(private _fb: FormBuilder,
              private _dialog: MatDialogRef<SeanseDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) data: ItemDetailsData<Diagnose>,
              private _hallsService: SymptomsService,
              private _moviesService: DiseasesService) {
    this._create = data.create;
    this._seanse = data.item;
    this._halls$ = new BehaviorSubject<Symptom[]>([]);
    this._movies$ = new BehaviorSubject<Disease[]>([]);
  }

  // region Getters
  get form(): FormGroup {
    return this._form;
  }

  get create(): boolean {
    return this._create;
  }

  get movies(): Observable<Disease[]> {
    return this._movies$ as Observable<Disease[]>;
  }

  get halls(): Observable<Symptom[]> {
    return this._halls$ as Observable<Symptom[]>
  }
  // endregion

  ngOnInit(): void {
    this._form = this.buildForm();
    this.loadHalls();
    this.loadMovies();
    this.test()
  }

  private test() {
    this.form.get('movieId')?.valueChanges.pipe(
      tap(console.log)
    ).subscribe();
  }

  private buildForm(): FormGroup {
    const startDate = this._seanse?.startTime ? new Date(this._seanse!.startTime) : new Date(Date.now());
    const date = this.formatDateToHTMLDateTimeInput(startDate);
    console.log(date);

    return this._fb.group({
      movie: [this._seanse?.movie || undefined, [Validators.required]],
      hall: [this._seanse?.hall || undefined, [Validators.required]],
      startTime: [date || false, [Validators.required]]
    });
  }

  private loadHalls(): void {
    this._hallsService.getAllItems().pipe(
      filter(result => !!result),
      tap(result => this._halls$.next(result!))
    ).subscribe();
  }

  private loadMovies(): void {
    this._moviesService.getAllItems().pipe(
      filter(result => !!result),
      tap(result => this._movies$.next(result!)),
    ).subscribe();
  }

  private parseForm(): Diagnose {
    return {
      id: this._seanse?.id,
      movieId: this._form.get('movie')?.value.id,
      hallId: this._form.get('hall')?.value.id,
      startTime: this._form.get('startTime')?.value
    } as Diagnose;
  }

  public onSubmit(): void {
    const seanse = this.parseForm();

    this._dialog.close(seanse)
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

  public hallsDisplayWith = (hall: Symptom) => hall ? hall.name : '';

  public moviesDisplayWith = (movie: Disease) => movie ? movie.title : '';

  private formatDateToHTMLDateTimeInput = (date: Date) => {
    const yyyy = date.getFullYear();
    const MM = date.getMonth() + 1;
    const dd = date.getDate();
    const hh = date.getHours();
    const mm = date.getMinutes();

    return `${yyyy}-${MM < 10 ? `0${MM}` : MM}-${dd < 10 ? `0${dd}` : dd}T${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}`;
  }
}
