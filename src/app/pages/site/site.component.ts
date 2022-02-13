import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  startUserRegister(): void {
    this.userEmail = this.email;
    this.router.navigate(['/register']);
  }

}
