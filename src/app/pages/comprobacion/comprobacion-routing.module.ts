import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComprobacionPage } from './comprobacion.page';

const routes: Routes = [
  {
    path: '',
    component: ComprobacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprobacionPageRoutingModule {}
