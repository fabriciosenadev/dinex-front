import { Component, Input, OnInit, ViewChild } from '@angular/core';

// chart dependencies
import { ChartType, ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input() chartData: number[] = [];
  @Input() chartLabels: string[] = [];
  @Input() chartTitle: string = '';

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
    this.pieChartData.datasets[0].data = this.chartData;
    this.pieChartData.labels = this.chartLabels;
    this.chart?.update();
  }

}
