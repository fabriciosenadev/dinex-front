import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformRoutingModule } from './platform-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ComponentsModule } from 'src/app/components/components.module';

import { MainComponent } from './main/main.component';
import { CategoryComponent } from './category/category.component';
import { LaunchingModule } from './launching/launching.module';

@NgModule({
  declarations: [
    MainComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    PlatformRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    FontAwesomeModule,
    LaunchingModule
  ]
})
export class PlatformModule { }
