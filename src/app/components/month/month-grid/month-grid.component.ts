import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LaunchResumeByYearAndMonth } from 'src/app/shared/interfaces/launch/launch-resume-by-year-and-month.interface';

@Component({
  selector: 'app-month-grid',
  templateUrl: './month-grid.component.html',
  styleUrls: ['./month-grid.component.css']
})
export class MonthGridComponent implements OnInit {
  @Input() launchesResume: LaunchResumeByYearAndMonth[] = [];
  @Output() selectedMonthDetailPage: EventEmitter<string> = new EventEmitter();

  arrayMonthNames: string[] = [];
  constructor() { }

  ngOnInit(): void {
    this.launchesResume.sort((a, b) => (a.startDate < b.startDate) ? -1 : 1);    
  }

  monthDetailPage(selectedMonth: string) {
    this.selectedMonthDetailPage.emit(selectedMonth);
  }
}
