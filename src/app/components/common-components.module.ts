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

@NgModule({
  declarations: [
    CommonSnackBarComponent,
    SuccessSnackBarComponent,
    InfoSnackBarComponent,
    WarningSnackBarComponent,
    ErrorSnackBarComponent,
    ActionSnackBarComponent,
  ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    MatSnackBarModule
  ],
  exports: [
    CommonSnackBarComponent,
    SuccessSnackBarComponent,
    InfoSnackBarComponent,
    WarningSnackBarComponent,
    ErrorSnackBarComponent,
    ActionSnackBarComponent
  ]
})
export class CommonComponentsModule { }
