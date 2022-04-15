import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivationRoutingModule } from './activation-routing.module';
import { AccountComponent } from './account/account.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { NoActivationCodeComponent } from './no-activation-code/no-activation-code.component';


@NgModule({
  declarations: [
    AccountComponent,
    NoActivationCodeComponent
  ],
  imports: [
    CommonModule,
    ActivationRoutingModule,

    ComponentsModule
  ]
})
export class ActivationModule { }
