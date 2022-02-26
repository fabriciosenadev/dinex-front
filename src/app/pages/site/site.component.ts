import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { headerOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  email: string = '';

  set userEmail(email: string) {
    this.userService.userRegister.email = email;
  }

  set headerOption(value: headerOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    private router: Router,
    private userService: UserService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.headerOption = headerOptionsEnum.site;
  }

  startUserRegister(): void {
    this.userEmail = this.email;
    this.router.navigate(['/register']);
  }

}
