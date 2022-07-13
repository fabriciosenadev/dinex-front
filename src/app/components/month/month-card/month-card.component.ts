import { Component, Input, OnInit } from '@angular/core';
import { LaunchResumeByYearAndMonth } from 'src/app/shared/interfaces/launch/launch-resume-by-year-and-month.interface';

@Component({
  selector: 'app-month-card',
  templateUrl: './month-card.component.html',
  styleUrls: ['./month-card.component.css']
})
export class MonthCardComponent implements OnInit {
  @Input() monthResume: LaunchResumeByYearAndMonth = {
    endDate: new Date(),
    startDate: new Date(),
    hasPending: false,
    paid: 0,
    received: 0,
    totalAvailable: 0
  };

constructor() { }

ngOnInit(): void {
}

showResume() {
}

getMonthNameUsingStartDate(startDate: Date) : string {
  let date = new Date(this.monthResume.startDate);
  let monthName = date.toLocaleString('pt-br', { month: 'long' });
  return monthName.charAt(0).toUpperCase() + monthName.slice(1);
}


}
