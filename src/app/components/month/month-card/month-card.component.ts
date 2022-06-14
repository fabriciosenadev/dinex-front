import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-month-card',
  templateUrl: './month-card.component.html',
  styleUrls: ['./month-card.component.css']
})
export class MonthCardComponent implements OnInit {
  @Input() monthName: string = 'month';

  constructor() { }

  ngOnInit(): void {
  }

  showResume() {
  }

}
