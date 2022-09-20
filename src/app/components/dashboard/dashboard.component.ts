import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user = ""
  
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getUser().subscribe(async (user) => {
      this.user =user.name.charAt(0).toUpperCase() + user.name.slice(1)


    });
  }

}
