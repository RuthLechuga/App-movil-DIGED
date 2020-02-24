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

  cursos_temporal = [
    {
      id: 1,
      nombre: 'Lenguajes de programación',
      catedratico: 'Luis Espino',
    },
    {
      id: 2,
      nombre: 'Seminario de sistemas',
      catedratico: 'Manuel Fernandez'
    },
    {
      id: 3,
      nombre: 'Compiladores 2',
      catedratico: 'Erick Navarro'
    },
    {
      id: 4,
      nombre: 'Lenguajes de programación',
      catedratico: 'Luis Espino',
    },
    {
      id: 5,
      nombre: 'Seminario de sistemas',
      catedratico: 'Manuel Fernandez'
    },
    {
      id: 6,
      nombre: 'Compiladores 2',
      catedratico: 'Erick Navarro'
    },
    {
      id: 7,
      nombre: 'Lenguajes de programación',
      catedratico: 'Luis Espino',
    },
    {
      id: 8,
      nombre: 'Seminario de sistemas',
      catedratico: 'Manuel Fernandez'
    },
    {
      id: 9,
      nombre: 'Compiladores 2',
      catedratico: 'Erick Navarro'
    },
  ]

  constructor(private service: ServicioService,
              private route: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.nombre_usuario = this.activeRoute.snapshot.paramMap.get('nombre');
    

    this.cursos = this.cursos_temporal;
    //descomentar cuando se haya implementado el servicio
    /*this.service.getCursos()
      .subscribe( cursos => {
        console.log(cursos);
        this.cursos = cursos;
      });*/
  }

  buscar(event) {
    this.textoBuscar = event.detail.value;
  }

  ver_detalle(curso){
    console.log('detalle del curso:',this.nombre_usuario,curso);
    this.route.navigate(['/temas',this.nombre_usuario,curso.id,curso.nombre]);
  }
  
}
