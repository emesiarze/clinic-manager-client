import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private _loginForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  get loginForm(): FormGroup {
    return this._loginForm;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this._loginForm = this._fb.group({
      login: [undefined, Validators.required],
      password: [undefined, Validators.required]
    });
  }

  onSubmit(): void {
    const login = this.loginForm.get('login')!.value;
    const password = this.loginForm.get('password')!.value;
    console.log(login, password);
  }
}
