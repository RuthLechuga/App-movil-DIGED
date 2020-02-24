import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemasPageRoutingModule } from './temas-routing.module';

import { TemasPage } from './temas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TemasPage]
})
export class TemasPageModule {}
