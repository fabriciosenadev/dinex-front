import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';
import { SiteComponent } from './site/site.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SiteComponent
  ],
  exports: [
    
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    
    FormsModule,
    ReactiveFormsModule,

    ComponentsModule    
  ]
})
export class PagesModule { }
