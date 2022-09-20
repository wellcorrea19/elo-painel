import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "../../components/login/login.component";
import {UsersComponent} from "../../components/users/users.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardModule} from "../dashboard/dashboard.module";
import {MatTableModule} from "@angular/material/table";
import {RouterModule} from "@angular/router";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {ActionUsersModalComponent} from "../../components/users/action-users-modal/action-users-modal.component";
import {MatButtonModule} from "@angular/material/button";
import {UpdateUserComponent} from "../../components/users/update-user/update-user.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { RegisterUserComponent } from 'src/app/components/users/register-user/register-user.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
      LoginComponent,
      UsersComponent,
      ActionUsersModalComponent,
      UpdateUserComponent,
      RegisterUserComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DashboardModule,
        MatTableModule,
        RouterModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatGridListModule,
        MatCheckboxModule
    ]
})
export class PagesModule { }
