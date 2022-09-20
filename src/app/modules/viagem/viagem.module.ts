import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViagemComponent} from "../../components/viagem/viagem.component";
import {AgmCoreModule} from "@agm/core";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViagemTableComponent} from "../../components/viagem/viagem-table/viagem-table.component";
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatSortModule} from "@angular/material/sort";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { MatSidenavModule } from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {SidebarComponent} from "../../components/layout/sidebar/sidebar.component";
import {DashboardModule} from "../dashboard/dashboard.module";


@NgModule({
    declarations: [ViagemComponent, ViagemTableComponent],
    exports: [

    ],
    imports: [
        CommonModule,
        MatSidenavModule,
        AgmCoreModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        MatIconModule,
        MatSortModule,
        BrowserAnimationsModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        DashboardModule,

    ]
})
export class ViagemModule { }
