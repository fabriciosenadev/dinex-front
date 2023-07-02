import { LaunchDataToChart } from "./chart/launch-data-to-chart.interface";
import { Launch } from "./launch.interface";

export interface LaunchDetailsByYearAndMonth {
    launches: Launch[];
    pieChartData: LaunchDataToChart[];
}