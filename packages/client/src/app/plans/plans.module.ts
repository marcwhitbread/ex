import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';


import { SharedModule } from './../shared/shared.module';
import { PlansRoutingModule } from './plans-routing.module';
import { PlanDetailComponent } from './plan-detail.component';
import { PlanService } from './plan.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PlansRoutingModule
  ],
  declarations: [PlanDetailComponent],
  providers: [
    DatePipe,
    PlanService
  ]
})
export class PlansModule { }
