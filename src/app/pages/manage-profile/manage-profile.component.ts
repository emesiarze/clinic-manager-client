import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss']
})
export class ManageProfileComponent implements OnInit {
  private _form: FormGroup;

  constructor(private _fb: FormBuilder, private _usersService: UserService, private _authService: AuthService) { }

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
      fullName: this.user.fullName || undefined,
    });
  }
  private createUserFromFrom(): User {
    return {
      id: this.user.id,
      fullName: this._form.get('fullName')!.value,
      login: this.form.get('login')!.value,
    } as User;
  }

  public updateUser(): void {
    const user = this.createUserFromFrom();
    this._usersService.updateItem(user).subscribe();
  }
}
