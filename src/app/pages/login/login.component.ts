import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { headerOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { UserLogin } from 'src/app/shared/models/user/user-login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  set headerOption(value: headerOptionsEnum) {
    this.headerService.headerOption = value;
  }
  
  constructor(
    private headerService: HeaderService,
  ) { }

  ngOnInit(): void {
    this.headerOption = headerOptionsEnum.login;
  }

  onSubmit(loginUserFormData: UserLogin): void {

    console.log(loginUserFormData);
    
    //need to call the service  
  }

}
