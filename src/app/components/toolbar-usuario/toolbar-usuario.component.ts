import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-usuario',
  templateUrl: './toolbar-usuario.component.html',
  styleUrls: ['./toolbar-usuario.component.scss'],
})
export class ToolbarUsuarioComponent implements OnInit {

  @Input() nombre: string;

  constructor(private route: Router) { }

  ngOnInit() {}

  salir(){
    this.route.navigate(['/inicio-sesion']);
  }

}
