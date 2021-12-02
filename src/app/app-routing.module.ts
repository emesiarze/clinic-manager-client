import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuard} from "./services/auth.guard";
import {ManageUsersComponent} from "./pages/manage-users/manage-users.component";
import {AdminGuard} from "./services/admin.guard";
import {PatientDetailsComponent} from "./pages/patient-details/patient-details.component";
import {LoginGuard} from "./services/login.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'patient-details',
    component: PatientDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-users',
    component: ManageUsersComponent,
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
