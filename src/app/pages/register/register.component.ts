import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { headerOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import Validation from 'src/app/shared/helpers/validator';

import { UserRegister } from 'src/app/shared/models/user/user-register.model';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading: boolean = false;
  
  userRegister: UserRegister = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  registerForm: FormGroup = new FormGroup({});

  get userEmailRegister() {
    return this.userService.userRegister.email;
  }

  get formData() {
    return this.registerForm.controls;
  }

  set headerOption(value: headerOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    private userService: UserService,
    private headerService: HeaderService,
  ) { }

  ngOnInit(): void {
    this.headerOption = headerOptionsEnum.site;
    this.userRegister.email = this.userEmailRegister;

    this.handleRegisterForm();
    console.log(this.registerForm);
  }

  handleRegisterForm() {
    this.registerForm = new FormGroup({
      fullName: new FormControl(
        this.userRegister.fullName,
        [
          Validators.required,
          Validators.minLength(10),
          
        ]
      ),
      email: new FormControl(
        this.userRegister.email,
        [
          Validators.required,
          Validators.email,
        ]
      ),
      password: new FormControl(
        this.userRegister.password,
        [
          Validators.required,
          Validators.minLength(8),
        ]
      ),
      confirmPassword: new FormControl(
        this.userRegister.confirmPassword,
        [
          Validators.required,
          Validators.minLength(8)
        ]
      )
    },{
      validators:[ Validation.match('password', 'confirmPassword') ]
    });
  }

  onSubmit() {
    // console.log(this.registerForm);
   }

}
