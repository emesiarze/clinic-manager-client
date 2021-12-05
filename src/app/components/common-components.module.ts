import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WarningSnackBarComponent} from "./snack-bars/warning-snack-bar/warning-snack-bar.component";
import {SuccessSnackBarComponent} from "./snack-bars/success-snack-bar/success-snack-bar.component";
import {InfoSnackBarComponent} from "./snack-bars/info-snack-bar/info-snack-bar.component";
import {ErrorSnackBarComponent} from "./snack-bars/error-snack-bar/error-snack-bar.component";
import {CommonSnackBarComponent} from "./snack-bars/common-snack-bar/common-snack-bar.component";
import {ActionSnackBarComponent} from "./snack-bars/action-snack-bar/action-snack-bar.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {CommonMaterialModule} from "../common-material.module";
import {DiagnoseDetailsComponent} from './diagnose-details/diagnose-details.component';
import {CommonFormsModule} from "../common-forms.module";
import {TranslatePipe} from "../helpers/translate.pipe";
import { CreateDiagnoseComponent } from './create-diagnose/create-diagnose.component';
import {SymptomsAutocompleteComponent} from "./symptoms-autocomplete/symptoms-autocomplete.component";

@NgModule({
  declarations: [
    CommonSnackBarComponent,
    SuccessSnackBarComponent,
    InfoSnackBarComponent,
    WarningSnackBarComponent,
    ErrorSnackBarComponent,
    ActionSnackBarComponent,
    DiagnoseDetailsComponent,
    TranslatePipe,
    CreateDiagnoseComponent,
    SymptomsAutocompleteComponent,
  ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    MatSnackBarModule,
    CommonFormsModule,
  ],
  exports: [
    CommonSnackBarComponent,
    SuccessSnackBarComponent,
    InfoSnackBarComponent,
    WarningSnackBarComponent,
    ErrorSnackBarComponent,
    ActionSnackBarComponent,
    TranslatePipe,
    CreateDiagnoseComponent,
    SymptomsAutocompleteComponent
  ]
})
export class CommonComponentsModule { }
