import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './pages/login/login.component';
import {CommonMaterialModule} from './common-material.module';
import {CommonFormsModule} from './common-forms.module';
import {HttpClientModule} from '@angular/common/http';
import {CommonComponentsModule} from "./components/common-components.module";
import {ManageUsersComponent} from './pages/manage-users/manage-users.component';
import {PatientDetailsComponent} from './pages/patient-details/patient-details.component';
import {GenericTableComponent} from './components/generic-table/generic-table.component';
import {UsersTableComponent} from './components/tables/users-table.component';
import {UserDetailsComponent} from "./components/user-details/user-details.component";
import {HallDetailsComponent} from "./components/hall-details/hall-details.component";
import {DiseasesTableComponent} from "./components/tables/diseases-table.component";
import {DiseaseDetailsComponent} from "./components/seanse-details/disease-details.component";
import {DatePipe, TimePipe} from './helpers/date-time.pipe';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonMaterialModule,
    CommonFormsModule,
    HttpClientModule,
    CommonComponentsModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ManageUsersComponent,
    PatientDetailsComponent,
    GenericTableComponent,
    UsersTableComponent,
    UserDetailsComponent,
    HallDetailsComponent,
    DiseasesTableComponent,
    DiseaseDetailsComponent,
    DatePipe,
    TimePipe,
  ],
  entryComponents: [
    UserDetailsComponent,
    HallDetailsComponent,
    DiseaseDetailsComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
