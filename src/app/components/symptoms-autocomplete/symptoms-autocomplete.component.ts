import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {filter, tap} from 'rxjs/operators';
import {Symptom} from "../../models/symptom";
import {SymptomsService} from "../../services/symptoms.service";
import {TranslatePipe} from "../../helpers/translate.pipe";

@Component({
  selector: 'app-symptoms-autocomplete',
  templateUrl: './symptoms-autocomplete.component.html',
  styleUrls: ['./symptoms-autocomplete.component.scss']
})
export class SymptomsAutocompleteComponent implements OnInit {
  protected _allSymptoms: Symptom[];
  protected _filteredSymptoms: Symptom[];
  private _selectedSymptom?: Symptom;

  private _label = 'Symptom';
  private _queryTooShort = true;
  private _translatePipe: TranslatePipe;

  @ViewChild('input') inputItem: ElementRef;

  //#region Getters and setters

  get label(): string {
    return this._label;
  }

  get filteredSymptoms(): Symptom[] {
    return this._filteredSymptoms;
  }

  get queryTooShort(): boolean {
    return this._queryTooShort;
  }


  @Output('selectionChange') protected _selectionChangeEmitter: EventEmitter<Symptom>;
  //#endregion

  constructor(private _symptomsService: SymptomsService) {
    this._selectionChangeEmitter = new EventEmitter<Symptom>();
  }

  ngOnInit(): void {
    this.loadData();
    this._translatePipe = new TranslatePipe();
  }

  //#region
  private loadData(): void {
    this._symptomsService.getAllItems().pipe(
      filter(symptoms => !!symptoms),
      tap(symptoms => {
        this._allSymptoms = symptoms!
      })
    ).subscribe();
  }
  //#endregion

  //#region On* functions
  public onKeyUp(event: any): void {
    const searchString = event.target.value;
    this._filteredSymptoms = this.filterData(searchString);
  }

  public onSelectionChange(symptom: Symptom): void {
    this._selectedSymptom = symptom;
    this._selectionChangeEmitter.emit(this._selectedSymptom);

    this.inputItem.nativeElement.blur();
    this.inputItem.nativeElement.focus();
  }

  public refocus() {
    this.inputItem.nativeElement.blur();
    this.inputItem.nativeElement.focus();
  }
  //#endregion

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

  //#region  Helpers
  /** Apply 'to string' transformation in order to correctly display items */
  public transformItem = (symptom: Symptom): string => {
    return this._translatePipe.transform(symptom.name);
  }

  public clearSelection(): void {
    this._selectedSymptom = undefined;
    this.inputItem.nativeElement.value = '';
    this._filteredSymptoms = this.filterData('');
    this._selectionChangeEmitter.emit(this._selectedSymptom);
  }
  //#endregion
}
