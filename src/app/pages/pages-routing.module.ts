import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SiteComponent } from './site/site.component';

const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:'app',
    loadChildren: () => import('./platform/platform.module').then(m => m.PlatformModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
