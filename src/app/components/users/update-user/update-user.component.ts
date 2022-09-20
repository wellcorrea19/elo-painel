import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


    user

    constructor(private router: Router,
                private route: ActivatedRoute,
                private api: ApiService) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.api.getUserById(id).subscribe((user) => {
            this.user = user.user[0]
            console.log(this.user)
        })
    }

    updateUser() {
         this.api.updateById(this.user).subscribe((user)=> {
             this.router.navigate(['/users']);
         })
    }

    updateSenha() {
        this.api.updateSenhaByCpf(this.user).subscribe((user)=> {
            this.router.navigate(['/users']);
        })
   }

    cancel() {
        this.router.navigate(['/users']);

    }

}
