import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.page.html',
  styleUrls: ['./temas.page.scss'],
})
export class TemasPage implements OnInit {

  id_curso = null;
  nombre_curso = '';
  nombre_usuario = '';
  temas: any[] = [];  

  constructor(private activeRoute: ActivatedRoute,
              private route: Router,
              private service: ServicioService) { }

  ngOnInit() {
    this.nombre_usuario = this.activeRoute.snapshot.paramMap.get('nombre');
    this.id_curso = this.activeRoute.snapshot.paramMap.get('id_curso');
    this.nombre_curso = this.activeRoute.snapshot.paramMap.get('nombre_curso');
    this.cargarTemas();
  }

  async cargarTemas(){
    this.temas = await <any>this.service.getTemas(this.id_curso);
    console.log(this.temas)
  }

  ver_detalle(tema){
    console.log(tema);
    this.route.navigate(['/detalle-tema',this.nombre_usuario,tema.Cod_Tema,this.nombre_curso,tema.tema]);
  }

}
