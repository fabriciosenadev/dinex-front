import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() selectedMonthDetailPage: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  showDetailedMonth(monthResume: LaunchResumeByYearAndMonth) {
    let date = new Date(monthResume.startDate);
    let month = date.toLocaleString('pt-br', { month: '2-digit' });
    let year = date.toLocaleString('pt-br', { year: 'numeric' });

    this.selectedMonthDetailPage.emit(`${year}/${month}`);
  }

  getMonthNameUsingStartDate(): string {
    let date = new Date(this.monthResume.startDate);
    let monthName = date.toLocaleString('pt-br', { month: 'long' });
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  }

  hasLaunch(monthResume: LaunchResumeByYearAndMonth): boolean {
    let hasLaunch = true;
    let hasPaing = monthResume.paid > 0;
    let hasReceiving = monthResume.received > 0;

    if (hasPaing || hasReceiving || monthResume.hasPending)
      hasLaunch = false;

    return hasLaunch;
  }
}
