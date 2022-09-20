import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../services/api.service'
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get formFields() { return this.loginForm.controls }

  onSubmit() {
    if (this.loginForm.invalid) {
      Swal.fire('Usuário ou senha inválidos!')
      return;
    }
    this.submitted = true;
    const informedUser = { username: this.formFields.username.value, password: this.formFields.password.value };
    try {
      this.apiService.login(informedUser).subscribe(async (user) => {
        if(user['error']){
          Swal.fire(user['msg']);
          this.submitted = false;
        } else {
          await this.apiService.setTokenToHeader(user)
          await this.router.navigate(['/dashboard'])
          await window.location.reload()
        }
      })
    }catch (error) {
      Swal.fire(error)
    }
  }

}
