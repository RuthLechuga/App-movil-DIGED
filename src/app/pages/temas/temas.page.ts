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

  temas_temporal = [
    {
      id: 1,
      titulo: 'Pequenas moleculas inorganicas',
    },
    {
      id: 2,
      titulo: 'Biomoleculas',
    },
    {
      id: 3,
      titulo: 'Glucidos o Carbohidratos',
    },
    {
      id: 4,
      titulo: 'Lipidos',
    },
    {
      id: 5,
      titulo: 'Aminoacidos',
    },
    {
      id: 6,
      titulo: 'Proteinas',
    },
    {
      id: 7,
      titulo: 'Acidos nucleicos',
    },
  ]
  

  constructor(private activeRoute: ActivatedRoute,
              private route: Router,
              private service: ServicioService) { }

  ngOnInit() {
    this.nombre_usuario = this.activeRoute.snapshot.paramMap.get('nombre');
    this.id_curso = this.activeRoute.snapshot.paramMap.get('id_curso');
    this.nombre_curso = this.activeRoute.snapshot.paramMap.get('nombre_curso');
    
    this.temas = this.temas_temporal;
    //implementar servicio para obtener temas
  }

  ver_detalle(tema){
    console.log(tema);
    this.route.navigate(['/detalle-tema']);
  }

}
