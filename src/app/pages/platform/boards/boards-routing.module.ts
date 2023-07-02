import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMonthsComponent } from './all-months/all-months.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: 'all-months',
    component: AllMonthsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardsRoutingModule { }
