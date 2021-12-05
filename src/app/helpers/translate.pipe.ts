import { Pipe, PipeTransform } from '@angular/core';
import {DISEASES_TRANSLATIONS, SYMPTOMS_TRANSLATIONS} from "../models/translations";

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(value: string): string {
    if (Object.keys(SYMPTOMS_TRANSLATIONS).includes(value)) {
      return SYMPTOMS_TRANSLATIONS[value] as string;
    } else if (Object.keys(DISEASES_TRANSLATIONS).includes(value)) {
      return DISEASES_TRANSLATIONS[value] as string;
    } else return value;
  }

}
