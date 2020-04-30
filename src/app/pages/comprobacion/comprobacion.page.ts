import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-comprobacion',
  templateUrl: './comprobacion.page.html',
  styleUrls: ['./comprobacion.page.scss'],
})
export class ComprobacionPage implements OnInit {

  nombre_usuario: string;
  id_titulo: string;
  nombre_curso: string;
  nombre_tema: string;
  nombre_titulo: string;
  contenido:string;

  constructor(private activeRoute: ActivatedRoute,
              private route: Router,
              public service: ServicioService) { }

  ngOnInit() {
    this.nombre_usuario = this.activeRoute.snapshot.paramMap.get('nombre');
    this.id_titulo = this.activeRoute.snapshot.paramMap.get('id_titulo');
    this.nombre_curso = this.activeRoute.snapshot.paramMap.get('nombre_curso');
    this.nombre_tema = this.activeRoute.snapshot.paramMap.get('nombre_tema');
    this.nombre_titulo = this.activeRoute.snapshot.paramMap.get('nombre_titulo');
  }

}
