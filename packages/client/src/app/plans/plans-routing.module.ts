import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanDetailComponent } from './plan-detail.component';

const routes: Routes = [{
  path: '',
  component: PlanDetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }
