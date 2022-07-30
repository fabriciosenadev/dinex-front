import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'launching',
    loadChildren: () => import('./launching/launching.module').then(m => m.LaunchingModule)
  },
  {
    path: 'user-settings',
    loadChildren: () => import('./user-settings/user-settings.module').then(m => m.UserSettingsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformRoutingModule { }
