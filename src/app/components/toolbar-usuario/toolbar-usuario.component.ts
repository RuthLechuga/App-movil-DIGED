import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar-usuario',
  templateUrl: './toolbar-usuario.component.html',
  styleUrls: ['./toolbar-usuario.component.scss'],
})
export class ToolbarUsuarioComponent implements OnInit {

  @Input() nombre: string;

  constructor() { }

  ngOnInit() {}

}
