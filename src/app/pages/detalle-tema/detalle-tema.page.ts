import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/services/servicio.service';

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
  image = null;
  coordenadas;
  width_screen: number;
  height_screen: number;
  width_image: number;
  proporcion: number = 2;
  left: string;
  top: string;
  width: string;
  height: string;
  radio: string;

  constructor(private activeRoute: ActivatedRoute,
              private route: Router,
              public service: ServicioService) { }

  ngOnInit() {
    this.cargarDetalle();
  }

  async cargarDetalle(){
    this.id_tema = this.activeRoute.snapshot.paramMap.get('id_tema');
    let datos = await <any>this.service.getDetalleTema(this.id_tema);

    if(datos.Imagen){
      this.image = "data:image/jpeg;base64,"+datos.Imagen;
      const image = new Image();
      image.src = this.image;
      let self = this;
      image.onload = function(){
        self.width_image = image.width;
      }
      this.coordenadas = datos.coordenadas[0];
      console.log(this.coordenadas);
    }
    else{
      this.coordenadas = datos.coordenadas[0];
      console.log(this.coordenadas);
    }

    this.nombre_usuario = this.activeRoute.snapshot.paramMap.get('nombre');
    this.nombre_curso = this.activeRoute.snapshot.paramMap.get('nombre_curso');
    this.nombre_tema = this.activeRoute.snapshot.paramMap.get('nombre_tema');
    this.width_screen = +localStorage.getItem('width_screen')
  }

  enlazar(id_titulo,nombre_titulo){
    console.log(id_titulo);
    this.route.navigate(['/contenido',this.nombre_usuario,id_titulo,this.nombre_curso,this.nombre_tema,nombre_titulo]);
  }

  getDimensionesRect(coordenada){
    if(coordenada.tipoEnlace==2){
      this.proporcion = this.width_image / this.width_screen;
      const coordenadasRect = coordenada.Coordenadas.split(',');
      this.left = (coordenadasRect[0]/this.proporcion).toFixed()+"px";
      this.top = (coordenadasRect[1]/this.proporcion).toFixed()+"px";
      this.width = (<number><unknown>(coordenadasRect[2] / this.proporcion).toFixed()-<number><unknown>(coordenadasRect[0] / this.proporcion).toFixed())+"px";
      this.height = (<number><unknown>(coordenadasRect[3] / this.proporcion).toFixed()-<number><unknown>(coordenadasRect[1] / this.proporcion).toFixed())+"px";
      return true;  
    }
    return false;
  }

  getDimensionesCircle(coordenada){
    if(coordenada.tipoEnlace==1){
      this.proporcion = this.width_image / this.width_screen;
      const coordenadasCircle = coordenada.Coordenadas.split(',');
      this.radio = ((coordenadasCircle[2]/this.proporcion)*2).toFixed()+"px";
      this.left = (<number><unknown>(coordenadasCircle[0] / this.proporcion).toFixed()-<number><unknown>(coordenadasCircle[2] / this.proporcion).toFixed())+"px";
      this.top = (<number><unknown>(coordenadasCircle[1] / this.proporcion).toFixed()-<number><unknown>(coordenadasCircle[2] / this.proporcion).toFixed())+"px";
      
      return true;  
    }
    return false;
  }
}
