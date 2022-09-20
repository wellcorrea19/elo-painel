import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {ViagemModule} from "./modules/viagem/viagem.module";

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardModule} from "./modules/dashboard/dashboard.module";
import {PagesModule} from "./modules/pages/pages.module";
import {AuthGuardian} from "./AuthGuardian";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        ViagemModule,
        DashboardModule,
        PagesModule,

        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAlmZiHIz-5UTWky5wUhuyZBchLCqvfOd8'
        }),
        NoopAnimationsModule
    ],
    providers: [AuthGuardian, GoogleMapsAPIWrapper],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
