import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "../../components/dashboard/dashboard.component";
import {SidebarComponent} from "../../components/layout/sidebar/sidebar.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [DashboardComponent, SidebarComponent],
  exports: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule
  ]
})
export class DashboardModule { }
