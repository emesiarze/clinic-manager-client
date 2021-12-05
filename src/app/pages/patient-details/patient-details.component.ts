import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
import {UsersService} from "../../services/users.service";
import {tap} from "rxjs/operators";
import {Diagnose} from "../../models/diagnose";
import {DiagnosesService} from "../../services/diagnoses.service";
import { GenericDataSource } from 'src/app/models/generic-data-source';
import {MatDialog} from "@angular/material/dialog";
import {DiagnoseDetailsComponent} from "../../components/diagnose-details/diagnose-details.component";
import {CreateDiagnoseComponent} from "../../components/create-diagnose/create-diagnose.component";

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  private _form: FormGroup;
  private _user: User;
  private _diagnosesDataSource = new GenericDataSource<Diagnose>([]);

  constructor(private _fb: FormBuilder,
              private _usersService: UsersService,
              private _diganosesService: DiagnosesService,
              private _dialogService: MatDialog,
              private _authService: AuthService,

  ) { }

  get diagnosesDataSource(): GenericDataSource<Diagnose> {
    return this._diagnosesDataSource;
  }

  get form(): FormGroup {
    return this._form;
  }

  ngOnInit(): void {
    this._user = this._diganosesService.selectedUser;
    this._form = this.createForm();
    this.getUserDiagnoses();
  }

  private getUserDiagnoses(): void {
    this._diganosesService.getAllUserDiagnoses(this._user.id).pipe(
      tap(diagnoses => {
        if (!!diagnoses) this._diagnosesDataSource.data.next(diagnoses)
      })
    ).subscribe()
  }

  private createForm(): FormGroup {
    return this._fb.group({
      login: { value: this._user?.login || undefined, disabled: true },
      fullName: { value: this._user?.fullName || undefined, disabled: true},
    });
  }

  public openCreateDiagnoseDialog(): void {
    this._dialogService.open(CreateDiagnoseComponent, {
      data: this._user,
      width: '50vw',
      maxHeight: '90vh'
    }).afterClosed()
      .pipe(
        tap(diagnose => {
          this.openDiagnoseDetails(diagnose);
          this.getUserDiagnoses();
        }),
      ).subscribe();
  }

  public openDiagnoseDetails(diagnose: Diagnose): void {
    this._dialogService.open(DiagnoseDetailsComponent, {
      data: diagnose,
      width: '50vw',
      maxHeight: '90vh'
    });
  }

  public isDoctor(): boolean {
    return this._authService.isDoctor();
  }
}
