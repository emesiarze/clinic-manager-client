import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Seanse} from "../../models/seanse";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ItemDetailsData} from "../../models/item-details-data";
import {BehaviorSubject, Observable} from "rxjs";
import {MoviesService} from "../../services/movies.service";
import {Movie} from "../../models/movie";
import {HallsService} from "../../services/halls.service";
import {Hall} from "../../models/hall";
import {filter, tap} from "rxjs/operators";

@Component({
  selector: 'app-seanse-details',
  templateUrl: './seanse-details.component.html',
  styleUrls: ['./seanse-details.component.scss']
})
export class SeanseDetailsComponent implements OnInit {
  private _form: FormGroup;
  private readonly _create: boolean;
  private _seanse?: Seanse;
  private readonly _halls$: BehaviorSubject<Hall[]>;
  private readonly _movies$: BehaviorSubject<Movie[]>;

  constructor(private _fb: FormBuilder,
              private _dialog: MatDialogRef<SeanseDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) data: ItemDetailsData<Seanse>,
              private _hallsService: HallsService,
              private _moviesService: MoviesService) {
    this._create = data.create;
    this._seanse = data.item;
    this._halls$ = new BehaviorSubject<Hall[]>([]);
    this._movies$ = new BehaviorSubject<Movie[]>([]);
  }

  // region Getters
  get form(): FormGroup {
    return this._form;
  }

  get create(): boolean {
    return this._create;
  }

  get movies(): Observable<Movie[]> {
    return this._movies$ as Observable<Movie[]>;
  }

  get halls(): Observable<Hall[]> {
    return this._halls$ as Observable<Hall[]>
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

  private parseForm(): Seanse {
    return {
      id: this._seanse?.id,
      movieId: this._form.get('movie')?.value.id,
      hallId: this._form.get('hall')?.value.id,
      startTime: this._form.get('startTime')?.value
    } as Seanse;
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

  public hallsDisplayWith = (hall: Hall) => hall ? hall.name : '';

  public moviesDisplayWith = (movie: Movie) => movie ? movie.title : '';

  private formatDateToHTMLDateTimeInput = (date: Date) => {
    const yyyy = date.getFullYear();
    const MM = date.getMonth() + 1;
    const dd = date.getDate();
    const hh = date.getHours();
    const mm = date.getMinutes();

    return `${yyyy}-${MM < 10 ? `0${MM}` : MM}-${dd < 10 ? `0${dd}` : dd}T${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}`;
  }
}
