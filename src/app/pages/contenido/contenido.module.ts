import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContenidoPageRoutingModule } from './contenido-routing.module';

import { ContenidoPage } from './contenido.page';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ContenidoPageRoutingModule
  ],
  declarations: [ContenidoPage]
})
export class ContenidoPageModule {}
