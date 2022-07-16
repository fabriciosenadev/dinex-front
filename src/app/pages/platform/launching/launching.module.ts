import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaunchingRoutingModule } from './launching-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/components/components.module';
import { NewLaunchComponent } from './new-launch/new-launch.component';
import { LaunchingMonthDetailsComponent } from './launching-month-details/launching-month-details.component';


@NgModule({
  declarations: [
    NewLaunchComponent,
    LaunchingMonthDetailsComponent
  ],
  imports: [
    CommonModule,
    LaunchingRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    FontAwesomeModule
  ]
})
export class LaunchingModule { }
