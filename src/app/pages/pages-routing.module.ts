import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
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
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'activation',
    loadChildren: () => import('./activation/activation.module').then(m => m.ActivationModule)
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
