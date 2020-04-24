import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.page.html',
  styleUrls: ['./contenido.page.scss'],
})
export class ContenidoPage implements OnInit {

  nombre_usuario: string;
  id_titulo: string;
  nombre_curso: string;
  nombre_tema: string;
  nombre_titulo: string;

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.nombre_usuario = this.activeRoute.snapshot.paramMap.get('nombre');
    this.id_titulo = this.activeRoute.snapshot.paramMap.get('id_titulo');
    this.nombre_curso = this.activeRoute.snapshot.paramMap.get('nombre_curso');
    this.nombre_tema = this.activeRoute.snapshot.paramMap.get('nombre_tema');
    this.nombre_titulo = this.activeRoute.snapshot.paramMap.get('nombre_titulo');
  }

}
