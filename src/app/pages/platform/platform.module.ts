import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformRoutingModule } from './platform-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ComponentsModule } from 'src/app/components/components.module';

import { LaunchingModule } from './launching/launching.module';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { BoardsModule } from './boards/boards.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PlatformRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    FontAwesomeModule,
    LaunchingModule,
    UserSettingsModule,
    BoardsModule
  ],
  exports: [
  ]
})
export class PlatformModule { }
