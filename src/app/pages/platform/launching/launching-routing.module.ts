import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditLaunchComponent } from './edit-launch/edit-launch.component';
import { LaunchingMonthDetailsComponent } from './launching-month-details/launching-month-details.component';
import { NewLaunchComponent } from './new-launch/new-launch.component';

const routes: Routes = [
  {
    path: 'new',
    component: NewLaunchComponent
  },
  {
    path: 'edit/:launchId',
    component: EditLaunchComponent
  },
  {
    path: ':year/:month',
    component: LaunchingMonthDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaunchingRoutingModule { }
