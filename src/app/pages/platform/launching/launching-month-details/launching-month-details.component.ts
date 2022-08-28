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
    private session: SessionService,
    private currentRoute: ActivatedRoute,
    private launchService: LaunchService,
    public override notify: NotificationService,
  ) {
    super(notify)
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
    this.launchService.getDetailsByYearAndMonth(this.year, this.month).subscribe(
      (result: LaunchDetailsByYearAndMonth) => {
        this.launchDetailsByYearAndMonth = result;

        this.launches = this.launchDetailsByYearAndMonth.launches
          .filter(x => x.status.toLowerCase() !== LaunchStatus.pending);

        this.pendingLaunches = this.launchDetailsByYearAndMonth.launches
          .filter(x => x.status.toLowerCase() === LaunchStatus.pending);

        this.launchDataToChart = this.launchDetailsByYearAndMonth.pieChartData;
      },
      (error) => {
        console.log(error)
        this.handleError(error);
      },
      () => { }
    );
  }

  deleteLaunch(launch: Launch): void {
    if (launch?.id)
      this.launchService.delete(launch?.id).subscribe(
        () => {
          let message = 'Lançamento deleteado!';
          this.handleSuccess(message);

          this.getDetailsByYearAndMonth();
        },
        (error) => {
          console.error(error);
          this.handleError(error);
        }
      );
  }

  updateStatusLaunch(launch: Launch): void {
    let launchAndPayMethod: LaunchAndPayMethod = {
      launch,
      payMethodFromLaunch: null
    }

    this.launchService.updateStatus(launchAndPayMethod, true).subscribe(
      (result) => {
        let message = 'Status atualizado!';
        this.handleSuccess(message);

        this.getDetailsByYearAndMonth();
      },
      (error) => {
        console.error(error);
        this.handleError(error);
      }
    );
  }

  getMonthName(): void {
    let date = new Date();
    date.setDate(1);
    date.setMonth(this.month - 1);
    date.setFullYear(this.year);

    this.monthName = date.toLocaleString('pt-br', { month: 'long' });
  }

  getChartData(applicable: string, isPayMethod: boolean): number[] {
    let data: number[] = []

    this.launchDataToChart.forEach((value, index) => {
      if (isPayMethod && value.payMethod !== '')
        data.push(value.amount);
      else if (value.applicable.toLocaleLowerCase() === applicable)
        data.push(value.amount);
    });


    return data;
  }

  getChartLabels(applicable: string, isPayMethod: boolean): string[] {
    let labels: string[] = [];

    this.launchDataToChart.forEach((value, index) => {
      if (isPayMethod && value.payMethod !== '') {
        switch (value.payMethod) {
          case 'Debit':
            labels.push('Débito');
            break;
          case 'Credit':
            labels.push('Crédito');
            break;
          case 'Cash':
            labels.push('Dinheiro');
            break;
        }

      }
      else if (value.applicable.toLocaleLowerCase() === applicable)
        labels.push(value.categoryName);
    });

    return labels;
  }

}
