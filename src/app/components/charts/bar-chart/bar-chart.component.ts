import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { LaunchResumeByYearAndMonth } from 'src/app/shared/interfaces/launch/launch-resume-by-year-and-month.interface';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input() chartData: LaunchResumeByYearAndMonth[] = [];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: ['2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80], label: 'Series A' },
      { data: [28, 48, 40], label: 'Series B' }
    ]
  }

  constructor() { }

  ngOnInit(): void {
    this.barChartData.labels = [];

    this.barChartData.datasets[0].label = 'Pago';
    this.barChartData.datasets[1].label = 'Recebido';

    this.barChartData.datasets[0].data = [];
    this.barChartData.datasets[1].data = [];
    let sortedChartData = this.chartData.sort((current, next) => {

      if(current.startDate < next.startDate)
        return -1;
      
      if(current.startDate > next.startDate)
        return 1;

      return 0;
    })
    
    sortedChartData.forEach(
      (value) => {
        let date = new Date(value.startDate);
        let monthName = date.toLocaleString('pt-br', { month: 'long' });

        this.barChartData.labels?.push(monthName);
        this.barChartData.datasets[0].data.push(value.paid);
        this.barChartData.datasets[1].data.push(value.received);
      }
    );

  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

}
