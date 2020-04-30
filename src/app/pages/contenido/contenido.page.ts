import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicioService } from 'src/app/services/servicio.service';

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
    this.cargarContenido();
  }

  async cargarContenido(){
    let datos = await <any>this.service.getContenido(this.id_titulo);
    this.contenido = datos.Contenido;
    console.log("Contenido:",this.contenido);
  }

  comprobacion(){
    this.route.navigate(['/comprobacion',this.nombre_usuario,this.id_titulo,this.nombre_curso,this.nombre_tema,this.nombre_titulo]);
  }

}
