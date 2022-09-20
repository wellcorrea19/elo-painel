import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import {ApiService} from "../../services/api.service";
import {ActionUsersModalComponent} from "./action-users-modal/action-users-modal.component";
import { RegisterUserComponent } from './register-user/register-user.component';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    displayedColumns = ['acoes', 'cpf', 'tracao', 'telefone', 'nome']
    users = []
    dataSource = new MatTableDataSource<String>([]);
    user

    constructor(private api: ApiService,
                public matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.api.getUser().subscribe(async (user) => {
            this.user = user
            this.dataSource.paginator = this.paginator
            this.dataSource.sort = this.sort;
            this.users = await this.createUsers()
            this.dataSource.data = this.users
        })
    }

    async createUsers() {
        const users = []
        await this.api.getAllUsersByCnpj(this.user.cnpjtransportadora).toPromise().then((data) => {
            for (let i = 0; i < data['users'].length; i++) {
                users.push({
                    id: data['users'][i].id,
                    cpf: data['users'][i].cpf,
                    tracao: data['users'][i].tracao,
                    telefone: data['users'][i].telefone,
                    nome: data['users'][i].name
                });
            }
        })
        return users
    }

    openModal(id) {
        const dialogConfig = new MatDialogConfig();
        // The user can't close the dialog by clicking outside its body
        dialogConfig.disableClose = true;
        dialogConfig.id = id;
        dialogConfig.height = "65%";
        dialogConfig.width = "65%";
        const modalDialog = this.matDialog.open(ActionUsersModalComponent, dialogConfig);
    }

    openModalRegister() {
        const dialogConfig = new MatDialogConfig();
        // The user can't close the dialog by clicking outside its body
        dialogConfig.disableClose = true;
        dialogConfig.height = "65%";
        dialogConfig.width = "60%";
        const modalDialog = this.matDialog.open(RegisterUserComponent, dialogConfig);
    }


}
