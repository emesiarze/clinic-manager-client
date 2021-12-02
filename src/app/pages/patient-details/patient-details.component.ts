import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
import {UsersService} from "../../services/users.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  private _form: FormGroup;

  constructor(private _fb: FormBuilder, private _usersService: UsersService, private _authService: AuthService) { }

  get form(): FormGroup {
    return this._form;
  }

  private get user(): User {
    return this._authService.user!;
  }

  ngOnInit(): void {
    this._form = this.createForm();
  }

  private createForm(): FormGroup {
    return this._fb.group({
      login: { value: this.user.login || undefined, disabled: true },
      fullName: { value: this.user.fullName || undefined, disabled: true},
    });
  }
  private createUserFromFrom(): User {
    return {
      id: this.user.id,
      fullName: this._form.get('fullName')!.value,
      login: this.form.get('login')!.value,
      isWorker: this.user.isWorker
    } as User;
  }

  public updateUser(): void {
    const user = this.createUserFromFrom();
    this._usersService.updateItem(user).pipe(
      tap(value => {
        value
          ? this._authService.user!.fullName = this.form.get('fullName')?.value
          : this.form.get('fullName')?.patchValue(this._authService.user!.fullName);
      })
    ).subscribe();
  }
}
