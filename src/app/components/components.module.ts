import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTopComponent } from './header-top/header-top.component';
import { IonicModule } from '@ionic/angular';
import { HeaderBottomComponent } from './header-bottom/header-bottom.component';
import { ToolbarUsuarioComponent } from './toolbar-usuario/toolbar-usuario.component';

@NgModule({
  declarations: [
    HeaderTopComponent,
    HeaderBottomComponent,
    ToolbarUsuarioComponent
  ],
  exports: [
    HeaderTopComponent,
    HeaderBottomComponent,
    ToolbarUsuarioComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
