import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { LaunchDetailsByYearAndMonth } from 'src/app/shared/interfaces/launch/launch-details-by-year-and-month.interface';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { LaunchService } from 'src/app/shared/services/launch/launch.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { SessionService } from 'src/app/shared/services/session/session.service';

import { Launch } from 'src/app/shared/interfaces/launch/launch.interface';
import { LaunchStatus } from 'src/app/shared/interfaces/launch/enums/launchStatusEnum';
import { LaunchDataToChart } from 'src/app/shared/interfaces/launch/chart/launch-data-to-chart.interface';
import { LaunchAndPayMethod } from 'src/app/shared/interfaces/launch/launch-and-pay-method.interface';
import { Notifications } from 'src/app/shared/extensions/notifications';

@Component({
  selector: 'app-launching-month-details',
  templateUrl: './launching-month-details.component.html',
  styleUrls: ['./launching-month-details.component.css']
})
export class LaunchingMonthDetailsComponent extends Notifications implements OnInit {

  year: number = 0;
  month: number = 0;
  monthName: string = '';

  showLaunchIn = false;
  showLaunchOut = false;

  launches: Launch[] = [];
  pendingLaunches: Launch[] = [];

  launchDataToChart: LaunchDataToChart[] = [];

  launchDetailsByYearAndMonth: LaunchDetailsByYearAndMonth = {
    launches: this.launches,
    pieChartData: this.launchDataToChart
  };

  set headerOption(value: HeaderOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    private headerService: HeaderService,
    session: SessionService,
    private currentRoute: ActivatedRoute,
    private launchService: LaunchService,
    notify: NotificationService,
  ) {
    super(notify, session)
  }

  ngOnInit(): void {
    this.session.validateSession();

    this.headerOption = HeaderOptionsEnum.app;

    let selectedYear = this.currentRoute.snapshot.paramMap.get('year');
    let selectedMonth = this.currentRoute.snapshot.paramMap.get('month');

    this.year = selectedYear ? parseFloat(selectedYear) : 0;
    this.month = selectedMonth ? parseFloat(selectedMonth) : 0;

    this.getMonthName();

    this.getDetailsByYearAndMonth();
  }

  getDetailsByYearAndMonth(): void {
    this.showLaunchIn = this.showLaunchOut = false;

    this.launchService.getDetailsByYearAndMonth(this.year, this.month).subscribe({
      next: (result: LaunchDetailsByYearAndMonth) => {
        this.launchDetailsByYearAndMonth = result;

        this.launches = this.launchDetailsByYearAndMonth.launches
          .filter(x => x.status.toLowerCase() !== LaunchStatus.pending);

        this.pendingLaunches = this.launchDetailsByYearAndMonth.launches
          .filter(x => x.status.toLowerCase() === LaunchStatus.pending);

        this.launchDataToChart = this.launchDetailsByYearAndMonth.pieChartData;         
      },
      error: (err) => {
        console.log(err)
        this.handleError(err);        
      },
      complete: () => {
        this.showLaunchIn = this.launchDataToChart.some((obj) => obj.applicable === 'In');
        this.showLaunchOut = this.launchDataToChart.some((obj) => obj.applicable === 'Out');
      }
    });
  }

  deleteLaunch(launch: Launch): void {
    if (launch?.id)
      this.launchService.delete(launch?.id).subscribe({
        next: () => {
          let message = 'Lançamento deleteado!';
          this.handleSuccess(message);

          this.getDetailsByYearAndMonth();
        },
        error: (error) => {
          console.error(error);
          this.handleError(error);
        }
      });
  }

  updateStatusLaunch(launch: Launch): void {
    let launchAndPayMethod: LaunchAndPayMethod = {
      launch,
      payMethodFromLaunch: null
    }

    this.launchService.updateStatus(launchAndPayMethod, true).subscribe({
      next: (result) => {
        let message = 'Status atualizado!';
        this.handleSuccess(message);

        this.getDetailsByYearAndMonth();
      },
      error: (error) => {
        console.error(error);
        this.handleError(error);
      }
    });
  }

  getMonthName(): void {
    let date = new Date();
    date.setDate(1);
    date.setMonth(this.month - 1);
    date.setFullYear(this.year);

    this.monthName = date.toLocaleString('pt-br', { month: 'long' });
  }
}
