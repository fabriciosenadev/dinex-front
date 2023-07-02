import { Component, Input, OnInit, ViewChild } from '@angular/core';

// chart dependencies
import { ChartType, ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { LaunchDataToChart } from 'src/app/shared/interfaces/launch/chart/launch-data-to-chart.interface';
import { LaunchStatus } from 'src/app/shared/interfaces/launch/enums/launchStatusEnum';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input() chartTitle: string = '';
  @Input() launchDataToChart: LaunchDataToChart[] = [];
  @Input() launchStatus: string = '';
  @Input() isPayMethod: boolean = false;


  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  pieChartType: ChartType = 'pie';

  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Download', 'Sales', 'In'],
    datasets: [{
      data: [300, 500, 100]
    },]
  };

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };

  pieChartPlugins = [DatalabelsPlugin];

  constructor() { }

  ngOnInit(): void {
    this.fillChart();
  }

  fillChart(): void {
    this.pieChartData.datasets[0].data = [];
    this.pieChartData.labels = [];

    if (!this.isPayMethod)
      this.launchDataToChart.forEach(
        (value, index) => {
          if (this.launchStatus === LaunchStatus.received && value.applicable.toLowerCase() === 'in') {
            this.pieChartData.datasets[0].data.push(value.amount);
            this.pieChartData.labels?.push(value.categoryName);
          }
          if (this.launchStatus === LaunchStatus.paid && value.applicable.toLowerCase() === 'out') {
            this.pieChartData.datasets[0].data.push(value.amount);
            this.pieChartData.labels?.push(value.categoryName);
          }
        }
      );

    if (this.isPayMethod) {
      let debit = 0;
      let credit = 0;
      let cash = 0;

      this.launchDataToChart.forEach(
        (value, index) => {
          if (this.launchStatus === LaunchStatus.paid && value.applicable.toLowerCase() === 'out') {
            switch (value.payMethod.toLowerCase()) {
              case 'debit':
                debit += value.amount;
                break;
              case 'credit':
                credit += value.amount;
                break;
              case 'cash':
                cash += value.amount;
                break;
            }
          }
        }
      );

      if (debit > 0) {
        this.pieChartData.datasets[0].data.push(debit);
        this.pieChartData.labels.push('Débito');
      }

      if(credit > 0) {
        this.pieChartData.datasets[0].data.push(credit);
        this.pieChartData.labels.push('Crédito');
      }

      if(cash > 0) {
        this.pieChartData.datasets[0].data.push(cash);
        this.pieChartData.labels.push('Dinheiro');
      }
    }

    this.chart?.update();
  }

}
