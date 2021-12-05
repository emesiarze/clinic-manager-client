import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {filter, tap} from 'rxjs/operators';
import {Symptom} from "../../models/symptom";
import {SymptomsService} from "../../services/symptoms.service";
import {TranslatePipe} from "../../helpers/translate.pipe";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-symptoms-autocomplete',
  templateUrl: './symptoms-autocomplete.component.html',
  styleUrls: ['./symptoms-autocomplete.component.scss']
})
export class SymptomsAutocompleteComponent implements OnInit {
  protected _allSymptoms: Symptom[];
  protected _filteredSymptoms: Symptom[];
  private _selectedSymptoms: Symptom[];
  private _searchQueryControl: FormControl;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('symptomInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('input') inputItem: ElementRef;
  @Output('symptomsChanged') protected _symptomsChangedEmitter: EventEmitter<Symptom[]>;

  private _queryTooShort = true;
  private _translatePipe: TranslatePipe;

  get filteredSymptoms(): Symptom[] {
    return this._filteredSymptoms;
  }

  get selectedSymptoms(): Symptom[] {
    return this._selectedSymptoms;
  }

  get queryTooShort(): boolean {
    return this._queryTooShort;
  }

  get searchQueryControl(): FormControl {
    return this._searchQueryControl;
  }

  get selectedSymptomsNames(): string[] {
    return this._selectedSymptoms.map(symptom => symptom.name);
  }

  constructor(private _symptomsService: SymptomsService) {
    this._symptomsChangedEmitter = new EventEmitter<Symptom[]>();
  }
  ngOnInit(): void {
    this._allSymptoms = [];
    this._filteredSymptoms = [];
    this._selectedSymptoms = [];
    this._translatePipe = new TranslatePipe();
    this._searchQueryControl = new FormControl();
    this.loadData();
    this.observeSearchQueryChanges();
  }

  private loadData(): void {
    this._symptomsService.getAllItems().pipe(
      filter(symptoms => !!symptoms),
      tap(symptoms => {
        this._allSymptoms = symptoms!
      })
    ).subscribe();
  }

  private observeSearchQueryChanges(): void {
    this._searchQueryControl.valueChanges.pipe(
      filter(query => typeof query === 'string'),
      tap(query => this._queryTooShort = query.length < 3),
      tap(query => this._filteredSymptoms = this.filterData(query))
    ).subscribe()
  }

  /** Apply own filters on `this._allSymptoms` field */
  public filterData(query: string): Symptom[] {
    this._queryTooShort = query.length < 2;
    return this._allSymptoms.filter(symptom => {
      const symptomNameTranslated = this.transformItem(symptom);
      return this._queryTooShort
        ? false
        : symptomNameTranslated.toLowerCase().includes(query.toLowerCase());
    });
  }

  public addSymptom(event: MatChipInputEvent): void {
    const symptomName = event.value;
    const symptom = this._allSymptoms.find(symptom => this.transformItem(symptom) === symptomName)
    this.onAddSymptom(symptom)
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    const symptom = event.option.value as Symptom;
    this.onAddSymptom(symptom)
  }

  public removeSymptom(symptomToRemove: Symptom): void {
    this._selectedSymptoms = this._selectedSymptoms.filter(symptom => symptom.id !== symptomToRemove.id)
  }

  private onAddSymptom(symptom?: Symptom): void {
    if (!!symptom && !this.selectedSymptomsNames.includes(symptom.name)) {
      this._selectedSymptoms.push(symptom);
      this._symptomsChangedEmitter.emit((this._selectedSymptoms));
      this._searchQueryControl.patchValue('');
    }
  }

  //#region  Helpers
  /** Apply 'to string' transformation in order to correctly display items */
  public transformItem = (symptom?: Symptom): string => {
    return !!symptom
      ? this._translatePipe.transform(symptom.name)
      : '';
  }
  //#endregion
}
