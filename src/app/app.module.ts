import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './pages/login/login.component';
import {CommonMaterialModule} from './common-material.module';
import {CommonFormsModule} from './common-forms.module';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './pages/home/home.component';
import {CommonComponentsModule} from "./components/common-components.module";
import {ManageSeansesComponent} from './pages/manage-seanses/manage-seanses.component';
import {ManageUsersComponent} from './pages/manage-users/manage-users.component';
import {ManageHallsComponent} from './pages/manage-halls/manage-halls.component';
import {ManageMoviesComponent} from './pages/manage-movies/manage-movies.component';
import {SeanseSelectionComponent} from './pages/seanse-selection/seanse-selection.component';
import {ManageProfileComponent} from './pages/manage-profile/manage-profile.component';
import {GenericTableComponent} from './components/generic-table/generic-table.component';
import {UsersTableComponent} from './components/tables/users-table.component';
import {UserDetailsComponent} from "./components/user-details/user-details.component";
import {MovieDetailsComponent} from "./components/movie-details/movie-details.component";
import {MoviesTableComponent} from "./components/tables/movies-table.component";
import {HallsTableComponent} from "./components/tables/halls-table.component";


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
    HomeComponent,
    ManageSeansesComponent,
    ManageUsersComponent,
    ManageHallsComponent,
    ManageMoviesComponent,
    SeanseSelectionComponent,
    ManageProfileComponent,
    GenericTableComponent,
    UsersTableComponent,
    UserDetailsComponent,
    MoviesTableComponent,
    MovieDetailsComponent,
    HallsTableComponent,
  ],
  entryComponents: [
    UserDetailsComponent,
    MovieDetailsComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
