import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleTemaPage } from './detalle-tema.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleTemaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleTemaPageRoutingModule {}
