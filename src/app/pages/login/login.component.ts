import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from 'src/app/services/login.service';
import {filter, switchMap} from "rxjs/operators";
import {User} from "../../models/user";
import {Observable} from "rxjs";
import {
  PatientModificationDialogComponent
} from "../../components/patient-modification-dialog/patient-modification-dialog.component";
import {ItemDetailsData} from "../../models/item-details-data";
import {MatDialog} from "@angular/material/dialog";
import {UsersService} from "../../services/users.service";
import {CommonValidators} from "../../helpers/validators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private _form: FormGroup;

  constructor(private _fb: FormBuilder,
              private _loginService: LoginService,
              private _dialogService: MatDialog,
              private _usersService: UsersService) { }

  get form(): FormGroup {
    return this._form;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this._form = this._fb.group({
      login: [undefined, Validators.required],
      password: [undefined, [Validators.required, CommonValidators.passwordValidator]]
    });
  }

  login(): void {
    if (this._form.valid) {
      const login = this.form.get('login')!.value;
      const password = this.form.get('password')!.value;
      this._loginService.login(login, password);
    }
  }


  public onOpenRegistrationDialog(): void {
    this.openDialogAndWaitForClosure().pipe(
      filter(value => !!value),
      switchMap(user => this._usersService.addItem(user)),
      filter(value => !!value),
    ).subscribe()
  }

  private openDialogAndWaitForClosure(): Observable<any> {
    return this._dialogService.open(PatientModificationDialogComponent, {
      data: {
        create: true,
      } as ItemDetailsData<User>,
      width: '50vw',
      maxHeight: '90vh'
    }).afterClosed()
  }

  public isValid(controlName: string): boolean {
    return !this.form.get(controlName)?.invalid;
  }

  public getFirstErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);

    if (control?.hasError('loginExists')) return 'Login jest już zajęty';
    else if (control?.hasError('required')) return 'Pole wymagane';
    else if (control?.hasError('invalidCharacters')) return 'Pole zawiera niedozwolone znaki';
    else return '';
  }
}
