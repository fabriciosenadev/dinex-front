import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformRoutingModule } from './platform-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ComponentsModule } from 'src/app/components/components.module';

import { MainComponent } from './main/main.component';
import { LaunchComponent } from './launch/launch.component';

@NgModule({
  declarations: [
    MainComponent,
    LaunchComponent
  ],
  imports: [
    CommonModule,
    PlatformRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    FontAwesomeModule,
  ]
})
export class PlatformModule { }
