import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleTemaPageRoutingModule } from './detalle-tema-routing.module';

import { DetalleTemaPage } from './detalle-tema.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleTemaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetalleTemaPage]
})
export class DetalleTemaPageModule {}
