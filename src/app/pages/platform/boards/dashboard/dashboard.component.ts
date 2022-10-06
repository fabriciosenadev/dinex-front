import { Component, OnInit } from '@angular/core';
import { Notifications } from 'src/app/shared/extensions/notifications';
import { HeaderOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { LaunchService } from 'src/app/shared/services/launch/launch.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { SessionService } from 'src/app/shared/services/session/session.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import * as moment from 'moment';
import { LaunchResumeByYearAndMonth } from 'src/app/shared/interfaces/launch/launch-resume-by-year-and-month.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends Notifications implements OnInit {

  userFirstName: string = '';

  amountAvailable = 0;

  loadingMonth = true;

  launchResumeByYearAndMonth: LaunchResumeByYearAndMonth = {
    received: 0,
    paid: 0,
    totalAvailable: 0,
    startDate: new Date(),
    endDate: new Date(),
    hasPending: false
  }

  chartData: LaunchResumeByYearAndMonth[] = [];
  chartCountMax = 3;

  set headerOption(value: HeaderOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    notify: NotificationService,
    session: SessionService,
    private headerService: HeaderService,
    private userService: UserService,
    private launchService: LaunchService,
    private router: Router,
  ) {
    super(notify, session)
  }

  ngOnInit(): void {
    this.session.validateSession();

    this.headerOption = HeaderOptionsEnum.app;
    setTimeout(() => {
      this.getUser();
    }, 100);

    this.getUserAmount();
    this.getMonth();
    this.getBarChartData();
  }

  getUser(): void {
    this.userService.getUser().subscribe(
      (user) => {
        this.userFirstName = user.fullName.split(' ')[0];
      },
      (err) => {
        console.log(err);
        let message = 'Error ao obter usuario';
        this.handleError({ message });
      }
    );
  }

  getUserAmount(): void {
    this.userService.getUserAmountAvailable().subscribe(
      (result) => {
        this.amountAvailable = result.amountAvailable;
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  getMonth(): void {
    let today = moment();
    let currentYear = today.year();
    let currentMonth = today.month() + 1;

    this.loadingMonth = true;
    this.launchService.getResumeByYearAndMonth(currentYear, currentMonth)
      .subscribe(
        (result) => {
          this.launchResumeByYearAndMonth = result
        },
        (error) => {
          this.handleError(error);
        },
        () => {
          this.loadingMonth = false;
        }
      );
  }

  getBarChartData(): void {
    this.chartData = [];
    
    let today = moment();
    let currentYear = today.year();
    let currentMonth = today.month() - 1;
    
    for (let i = 1; i <= this.chartCountMax; i++) {

      // console.log(currentMonth);
      
      this.launchService.getResumeByYearAndMonth(currentYear, currentMonth)
        .subscribe(
          (result) => {
            this.chartData.push(result)
            // console.log(this.chartData)
          },
          (error) => {
            this.handleError(error);
          }
        );
      currentMonth++;
    }
    // console.log(this.chartData);
    
  }

  openMonthDetailPage(selectedMonthDetailPage: string): void {
    this.router.navigate([`app/launching/${selectedMonthDetailPage}`]);
  }

  openAllMonths(): void {
    this.router.navigate([`app/all-months`]);
  }

}
