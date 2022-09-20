import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViagemComponent } from './components/viagem/viagem.component';
import { LoginComponent } from './components/login/login.component';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {UsersComponent} from "./components/users/users.component";
import {UpdateUserComponent} from "./components/users/update-user/update-user.component";
import {AuthGuardian} from "./AuthGuardian";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: "viagem",
    component: ViagemComponent,
    canActivate: [AuthGuardian]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardian]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuardian]
  },
  {
    path: 'users/update/:id',
    component: UpdateUserComponent,
    canActivate: [AuthGuardian]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
