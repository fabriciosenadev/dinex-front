import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { NoActivationCodeComponent } from './no-activation-code/no-activation-code.component';

const routes: Routes = [
  {
    path: '',
    component: NoActivationCodeComponent,
    pathMatch: 'full'
  },
  {
    path: ':activationCode',
    component: AccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivationRoutingModule { }
