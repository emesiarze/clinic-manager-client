import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import {ReservationComponent} from "./pages/reservation/reservation.component";
import {AuthGuard} from "./services/auth.guard";
import {ManageUsersComponent} from "./pages/manage-users/manage-users.component";
import {AdminGuard} from "./services/admin.guard";
import {ManageHallsComponent} from "./pages/manage-halls/manage-halls.component";
import {ManageSeansesComponent} from "./pages/manage-seanses/manage-seanses.component";
import {ManageMoviesComponent} from "./pages/manage-movies/manage-movies.component";
import {ManageProfileComponent} from "./pages/manage-profile/manage-profile.component";
import {LoginGuard} from "./services/login.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'reservation',
    component: ReservationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'seanse-selection',
    component: ManageSeansesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-profile',
    component: ManageProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-users',
    component: ManageUsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-halls',
    component: ManageHallsComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'manage-seanses',
    component: ManageSeansesComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'manage-movies',
    component: ManageMoviesComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
