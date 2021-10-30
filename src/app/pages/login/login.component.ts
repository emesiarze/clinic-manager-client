import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private _loginForm: FormGroup;

  constructor(private _fb: FormBuilder, private _loginService: LoginService) { }

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

  login(): void {
    if (this._loginForm.valid) {
      const login = this.loginForm.get('login')!.value;
      const password = this.loginForm.get('password')!.value;
      this._loginService.login(login, password);
    }
  }
}
