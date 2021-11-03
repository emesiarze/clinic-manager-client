import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {debounceTime, map} from "rxjs/operators";
import {Observable} from "rxjs";
import {LoginService} from "../services/login.service";

export class CommonValidators {
  private static readonly PASSWORD_ALPHABET = 'qwertyuiopasdfghjklxzcvnbmQWERTYUIOPASDFGHJKLZXCVBNM1234567890-=!@#$%^&*()_+';

  static passwordValidator = (control: AbstractControl): ValidationErrors | null => {
    if (control && control.value) {
      const password: string = control.value;
      const passwordChars = password.split('');
      const invalidCharsCount = passwordChars.reduce((prev: number, curr: string) => {
        return CommonValidators.PASSWORD_ALPHABET.includes(curr) ? prev : ++prev;
      }, 0);
      return invalidCharsCount > 0 ? { invalidCharacters: true } : null;
    }
    return null;
  }

  static loginValidator = (loginService: LoginService): AsyncValidatorFn => {
   return (control: AbstractControl): Observable<ValidationErrors | null> => {
     const login = control.value;
     return loginService.doesLoginExists(login).pipe(
       debounceTime(500),
       map(result => result ? { loginExists: true } : null)
     )
   }
  }
}
