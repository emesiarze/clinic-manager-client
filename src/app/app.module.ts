import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { CommonMaterialModule } from './common-material.module';
import { CommonFormsModule } from './common-forms.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { CommonComponentsModule } from "./components/common-components.module";
import { ManageSeansesComponent } from './pages/manage-seanses/manage-seanses.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { ManageHallsComponent } from './pages/manage-halls/manage-halls.component';
import { ManageMoviesComponent } from './pages/manage-movies/manage-movies.component';
import { SeanseSelectionComponent } from './pages/seanse-selection/seanse-selection.component';
import { ManageProfileComponent } from './pages/manage-profile/manage-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ManageSeansesComponent,
    ManageUsersComponent,
    ManageHallsComponent,
    ManageMoviesComponent,
    SeanseSelectionComponent,
    ManageProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonMaterialModule,
    CommonFormsModule,
    HttpClientModule,
    CommonComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
