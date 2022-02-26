import { Component, OnInit } from '@angular/core';
import { headerOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { HeaderService } from 'src/app/shared/services/header/header.service';

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

}
