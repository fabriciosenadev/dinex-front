import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { MainSettingsComponent } from './main-settings/main-settings.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryComponent } from './category/category.component';


@NgModule({
  declarations: [
    MainSettingsComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    UserSettingsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    FontAwesomeModule
  ]
})
export class UserSettingsModule { }
