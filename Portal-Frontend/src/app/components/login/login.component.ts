import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: 'login.html',
  styleUrls: ['login.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private dataService: DataService) { }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    let id = this.loginForm.controls.email.value;
    let pwd = this.loginForm.controls.password.value;

    this.dataService.login(id, pwd).subscribe((status: boolean) => {
      if (status === true)
        this.router.navigateByUrl('main');
      else
        this.invalidLogin = true;
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
