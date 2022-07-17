import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { headerOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { LaunchDetailsByYearAndMonth } from 'src/app/shared/interfaces/launch/launch-details-by-year-and-month.interface';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { LaunchService } from 'src/app/shared/services/launch/launch.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { SessionService } from 'src/app/shared/services/session/session.service';

import { Launch } from 'src/app/shared/interfaces/launch/launch.interface';
import { launchStatus } from 'src/app/shared/interfaces/launch/enums/launchStatusEnum';
import { LaunchDataToChart } from 'src/app/shared/interfaces/launch/chart/launch-data-to-chart.interface';
import { LaunchAndPayMethod } from 'src/app/shared/interfaces/launch/launch-and-pay-method.interface';

@Component({
  selector: 'app-launching-month-details',
  templateUrl: './launching-month-details.component.html',
  styleUrls: ['./launching-month-details.component.css']
})
export class LaunchingMonthDetailsComponent implements OnInit {

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

  set headerOption(value: headerOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    private headerService: HeaderService,
    private session: SessionService,
    private currentRoute: ActivatedRoute,
    private notify: NotificationService,
    private launchService: LaunchService,
  ) { }

  ngOnInit(): void {
    this.session.validateSession();

    this.headerOption = headerOptionsEnum.app;

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
          .filter(x => x.status.toLowerCase() !== launchStatus.pending);

        this.pendingLaunches = this.launchDetailsByYearAndMonth.launches
          .filter(x => x.status.toLowerCase() === launchStatus.pending);

        this.launchDataToChart = this.launchDetailsByYearAndMonth.pieChartData;
      },
      (error) => {
        console.log(error)
      },
      () => { }
    );
  }

  deleteLaunch(launch: Launch): void {
    this.launchService.delete(launch.id).subscribe(
      () => {
        this.notify.success('Sucesso', 'Lançamento deleteado!');
        this.getDetailsByYearAndMonth();
      },
      (error) => {
        console.error(error);
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
        this.notify.success('Sucesso', 'Status atualizado!');
        this.getDetailsByYearAndMonth();
      },
      (error) => {
        console.error(error);
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
      if (isPayMethod && value.payMethod !== '')
      {
        switch(value.payMethod)
        {
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
