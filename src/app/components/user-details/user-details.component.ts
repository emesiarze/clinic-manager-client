import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ItemDetailsData} from "../../models/item-details-data";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {CommonValidators} from "../../helpers/validators";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  private _form: FormGroup;
  private readonly _create: boolean;
  private _user?: User;

  constructor(private _fb: FormBuilder,
              private _dialog: MatDialogRef<UserDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) data: ItemDetailsData,
              private _loginService: LoginService) {
    this._create = data.create;
    this._user = data.user;
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
      login: [
        { value: this._user?.login || undefined, disabled: !this._create },
        [Validators.required],
        [CommonValidators.loginValidator(this._loginService)]
      ],
      fullName: [this._user?.fullName || undefined, [Validators.required]],
      password: [this._user?.password || undefined, [Validators.required, CommonValidators.passwordValidator]],
      isWorker: this._user?.isWorker || false
    });
  }

  private parseForm(): User {
    const user = {
      id: this._user?.id,
      fullName: this._form.get('fullName')?.value,
      login: this._form.get('login')?.value,
      isWorker: this._form.get('isWorker')?.value
    } as User;

    this._create ? user.password = this._form.get('password')?.value : {}

    return user;
  }

  public onSubmit(): void {
    const user = this.parseForm();

    this._dialog.close(user)
  }

  public closeDialog(): void {
    this._dialog.close(null);
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
