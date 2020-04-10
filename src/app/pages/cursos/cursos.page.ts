import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {

  cursos: any[] = [];
  textoBuscar = '';
  nombre_usuario = '';

  constructor(private service: ServicioService,
              private route: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.nombre_usuario = this.activeRoute.snapshot.paramMap.get('nombre');
    this.cargarCursos();
  }

  async cargarCursos(){
    this.cursos = await <any>this.service.getCursos();
    console.log(this.cursos)
  }

  buscar(event) {
    this.textoBuscar = event.detail.value;
  }

  ver_detalle(curso){
    console.log('detalle del curso:',this.nombre_usuario,curso);
    this.route.navigate(['/temas',this.nombre_usuario,curso.Cod_Curso,curso.Curso]);
  }
  
}
