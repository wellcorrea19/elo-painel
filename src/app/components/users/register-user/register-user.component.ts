import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  signUpForm: FormGroup;
  user
  checked: boolean;

  constructor(
    public dialogRef: MatDialogRef<RegisterUserComponent>,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
    tracao: ['', Validators.compose([
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(7)
    ])],
    email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40),
        Validators.email
    ])],
    senha: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15)
    ])],
    passwordCheck: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15)
    ])],
    telefone: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15)
    ])],
    cpf: ['', Validators.compose([
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11)
    ])],
    name: ['', Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(40),
    ])]
    })
    this.api.getUser().subscribe(async (user) => {
      this.user = user;
      console.log(this.user.cnpjtransportadora)
    });
  }

  registerFrota() {
    if (this.signUpForm.invalid && ( this.signUpForm.value.senha !== this.signUpForm.value.passwordCheck)) {
      Swal.fire('O formulário está inválido')
      return;
    }
    const informedFrota = { tracao: this.signUpForm.value.tracao, 
                            name: this.signUpForm.value.name,
                            telefone: this.signUpForm.value.telefone,
                            cpf: this.signUpForm.value.cpf,
                            email: this.signUpForm.value.email,
                            senha: this.signUpForm.value.senha,
                            passwordCheck: this.signUpForm.value.passwordCheck,
                            cnpjtransportadora: this.user.cnpjtransportadora,
                            frota: '2' };
    try {
      this.apiService.registerFrota(informedFrota).subscribe(async (user) => {
        if(user['error']){
          Swal.fire(user['msg']);
        } else {
          await window.location.reload()
        }
      })
    }catch (error) {
      Swal.fire(error)
    }
  }

  registerGestor() {
    if (this.signUpForm.invalid && ( this.signUpForm.value.senha !== this.signUpForm.value.passwordCheck)) {
      Swal.fire('O formulário está inválido')
      return;
    }
    const informedGestor = { name: this.signUpForm.value.name,
                            telefone: this.signUpForm.value.telefone,
                            cpf: this.signUpForm.value.cpf,
                            email: this.signUpForm.value.email,
                            senha: this.signUpForm.value.senha,
                            passwordCheck: this.signUpForm.value.passwordCheck,
                            cnpjtransportadora: this.user.cnpjtransportadora,
                            frota: '2'};
    try {
      this.apiService.registerGestor(informedGestor).subscribe(async (user) => {
        if(user['error']){
          Swal.fire(user['msg']);
        } else {
          await window.location.reload()
        }
      })
    }catch (error) {
      Swal.fire(error)
    }
  }
  
  showTracao() {
    this.checked = !this.checked;
  }

  closeModal() {
    this.dialogRef.close();
  }

}
