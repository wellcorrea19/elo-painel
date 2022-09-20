import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from "@angular/router";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-action-users-modal',
  templateUrl: './action-users-modal.component.html',
  styleUrls: ['./action-users-modal.component.scss']
})
export class ActionUsersModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ActionUsersModalComponent>,
              private router: Router,
              private api : ApiService) { }

  user

  ngOnInit(): void {
    this.api.getUserById(this.dialogRef.id).subscribe(async (user) => {
      try {
        this.user = await user.user[0]
      } catch (e) {

      }
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  updateUser(){
    this.closeModal()
    this.router.navigate([`/users/update/${this.user.id}`])
  }


}
