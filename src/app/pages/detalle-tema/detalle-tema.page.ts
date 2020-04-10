import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-tema',
  templateUrl: './detalle-tema.page.html',
  styleUrls: ['./detalle-tema.page.scss'],
})
export class DetalleTemaPage implements OnInit {

  id_tema= null;
  nombre_curso = '';
  nombre_usuario = '';
  nombre_tema = '';  

  constructor(private activeRoute: ActivatedRoute,
              private route: Router) { }

  ngOnInit() {
    this.nombre_usuario = this.activeRoute.snapshot.paramMap.get('nombre');
    this.id_tema = this.activeRoute.snapshot.paramMap.get('id_tema');
    this.nombre_curso = this.activeRoute.snapshot.paramMap.get('nombre_curso');
    this.nombre_tema = this.activeRoute.snapshot.paramMap.get('nombre_tema');
  }

}
