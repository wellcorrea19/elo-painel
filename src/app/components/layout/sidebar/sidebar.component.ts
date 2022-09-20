import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {element} from "protractor";
import {ElementRef} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    name = ""
    email = ""
    transportadora: any
    opened: boolean;

    constructor(private api: ApiService,
                private elRef: ElementRef,
                private router: Router) {
    }

    ngOnInit(): void {
        this.api.getUser().subscribe(async (user) => {
            this.name = user.name.charAt(0).toUpperCase() + user.name.slice(1)
            this.name = this.name.split(' ')[0];
            this.email = user.email.charAt(0).toUpperCase() + user.email.slice(1)
            this.email = this.email.split(' ')[0];
            this.transportadora = user.transportadora
        });
    }

    logout(){
        this.api.logout().subscribe(async (a)=>{
            await this.api.reloadHeaderAuthorization()
            await this.router.navigate(['/']);
        })
    }


}
