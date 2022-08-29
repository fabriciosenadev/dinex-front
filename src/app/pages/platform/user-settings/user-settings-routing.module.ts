import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSettingsComponent } from './main-settings/main-settings.component';

const routes: Routes = [
  {
    path:'',
    component: MainSettingsComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSettingsRoutingModule { }
