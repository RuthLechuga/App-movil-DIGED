import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContenidoPageRoutingModule } from './contenido-routing.module';

import { ContenidoPage } from './contenido.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ContenidoPageRoutingModule,
    PipesModule
  ],
  declarations: [ContenidoPage]
})
export class ContenidoPageModule {}
