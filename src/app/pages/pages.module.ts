import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';
import { SiteComponent } from './site/site.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { PlatformModule } from './platform/platform.module';


@NgModule({
  declarations: [
    SiteComponent,
    RegisterComponent
  ],
  exports: [
    
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    ComponentsModule,
    PlatformModule
  ]
})
export class PagesModule { }
