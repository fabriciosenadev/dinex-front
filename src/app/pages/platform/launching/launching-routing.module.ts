import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewLaunchComponent } from './new-launch/new-launch.component';

const routes: Routes = [
  {
    path: 'new',
    component: NewLaunchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaunchingRoutingModule { }
