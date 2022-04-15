import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-activation-code',
  templateUrl: './no-activation-code.component.html',
  styleUrls: ['./no-activation-code.component.css']
})
export class NoActivationCodeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['/']);
  }

}
