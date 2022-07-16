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

    this.getDetailsByYearAndMonth();
  }

  getDetailsByYearAndMonth(): void {
    this.launchService.getDetailsByYearAndMonth(this.year, this.month).subscribe(
      (result: LaunchDetailsByYearAndMonth) => {
        this.launchDetailsByYearAndMonth = result;
        
        let allLaunches = this.launchDetailsByYearAndMonth.launches;
        this.launches = allLaunches.filter(x => x.status.toLowerCase() !== launchStatus.pending);
        this.pendingLaunches =  allLaunches.filter(x => x.status.toLowerCase() === launchStatus.pending);        

        this.launchDataToChart = this.launchDetailsByYearAndMonth.pieChartData;
      },
      (error) => {
        console.log(error)
      },
      () => {}
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

}
