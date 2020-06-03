import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/services/servicio.service';

interface Respuesta {
  id: number;
  resp: string[];
  matriz: string[];
}

interface Calificacion {
  correcta: boolean;
  respuesta: string;
}

interface Pregunta {
  id: number;
  pregunta: string;
  tipo: string;
  respuestas: string[];
  preguntas_cruci: string[];
  matriz: string[][];
  matriz_color: string[][];
  tam_matriz: number;
  calificacion: Calificacion;
}

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
  descripcion: string = '';
  preguntas = [];
  
  preguntas_graficas: Pregunta[] = [];
  respuestas_correctas: Respuesta[] = [];
  respuestas_alumno: Respuesta[] = [];
  calificacion: Calificacion[] = [];
  ver_calificacion: boolean = false;
  correctas: number = 0;
  total: number = 0;

  constructor(private activeRoute: ActivatedRoute,
              private route: Router,
              public service: ServicioService) { }

  ngOnInit() {
    this.nombre_usuario = this.activeRoute.snapshot.paramMap.get('nombre');
    this.id_titulo = this.activeRoute.snapshot.paramMap.get('id_titulo');
    this.nombre_curso = this.activeRoute.snapshot.paramMap.get('nombre_curso');
    this.nombre_tema = this.activeRoute.snapshot.paramMap.get('nombre_tema');
    this.nombre_titulo = this.activeRoute.snapshot.paramMap.get('nombre_titulo');
    this.cargarDatos();
  }

  async cargarDatos(){
    let datos = await <any>this.service.getComprobacion(this.id_titulo);
    console.log(datos);

    this.descripcion = datos.DESCRIPCION;
    this.preguntas = datos.PREGUNTAS;
    this.cargarRespuestas();
    this.cargarPreguntas();

    for(let i=0;i<this.respuestas_correctas.length;i++)
      this.respuestas_alumno.push(null);
  }

  cargarPreguntas(){
    (<any>this.preguntas).forEach(element => {
      switch(element.tipo){
        case '1': case '2': case '3': case '4':
            this.preguntas_graficas.push({id: element.id, pregunta: element.Pregunta, tipo: element.tipo, respuestas: element.respuestas, preguntas_cruci: [], matriz: [], matriz_color: [], tam_matriz: 0, calificacion: null});
          break;
                
        case '5':
          let matriz = [];
          let matriz_color = [];
          let tam = Math.sqrt(element.matriz.length);
          let temporal = [];
          let temporal_color = [];
    
          for(let i=0;i<tam;i++){
            temporal = [];
            temporal_color = [];
    
            for(let j=0;j<tam;j++){
              temporal.push(element.matriz[i*tam+j]);
              temporal_color.push('white');
            }
    
            matriz.push(temporal);
            matriz_color.push(temporal_color);
          }

          this.preguntas_graficas.push({id: element.id, pregunta: element.Pregunta, tipo: element.tipo, respuestas: [] , preguntas_cruci: [], matriz: matriz, matriz_color: matriz_color, tam_matriz: tam, calificacion: null});
          break;
        
        case '6':
          let crucigrama = [];
          let crucigrama_color = [];
          let preguntas_cruci = [];
          let tamc = Math.sqrt(element.matriz.length-1);
          let temporalc = [];
          let temporalc_color = [];

          for(let i=0;i<tamc;i++){
            temporalc = [];
            temporalc_color = [];

            for(let j=0;j<tamc;j++){
              if(element.matriz[i*tamc+j] == ""){
                temporalc.push('%');
                temporalc_color.push('skyblue');
              }
              else{
                temporalc.push('');
                temporalc_color.push('white');
              }
            }
            crucigrama.push(temporalc);
            crucigrama_color.push(temporalc_color);
          }

          (<any>element.respuestas).forEach(sub_element => {
            preguntas_cruci.push(sub_element.descripcion+', en: X='+(+sub_element.X0+1)+", Y="+(+sub_element.Y0+1));
          });

          this.preguntas_graficas.push({id: element.id, pregunta: element.Pregunta, tipo: element.tipo, respuestas: [], preguntas_cruci: preguntas_cruci, matriz: crucigrama, matriz_color: crucigrama_color, tam_matriz: tamc, calificacion: null});
          break;
      }
    });
  }

  cargarRespuestas(){
    (<any>this.preguntas).forEach(element => {
      switch(element.tipo){
        case '1':
          if(element.respuestas[0].answer=='1')
            this.respuestas_correctas.push({id: element.id, resp: ["true"], matriz: []});
          else
            this.respuestas_correctas.push({id: element.id, resp: ["false"], matriz: []});

          break;
        
        case '2':
          this.respuestas_correctas.push({id: element.id, resp:[], matriz: []});
          break;
        
        case '3':
          this.respuestas_correctas.push({id: element.id, resp: [element.respuestas[0].answer.toLowerCase()], matriz: []});
          break;
        
        case '4':
          let respuestas = [];
          (<any>element.respuestas).forEach(sub_element => {
            if(sub_element.correcta == '1')
              respuestas.push(sub_element.answer);
          });
          this.respuestas_correctas.push({id: element.id, resp: respuestas, matriz: []});
          break;
        
        case '5':       
          let matriz = [];
          let respuestasm = [];
            
          for(let i=0;i<element.matriz.length;i++)
            matriz.push("");
          
          let tam = Math.sqrt(matriz.length);
          (<any>element.respuestas).forEach(sub_element => {
            let x0 = +sub_element.X0;
            let x1 = +sub_element.X1;
            let y0 = +sub_element.Y0;
            let y1 = +sub_element.Y1;
            let palabra = sub_element.answer;
          
            if(x0==x1 && y1>y0){
              let i=x0;
              for(let j=0;j<palabra.length;j++){
                matriz[i+tam*(j+y0)] = palabra[j];
              }
            }

            if(x0==x1 && y1<y0){
              let i=x0;
              for(let j=0;j<palabra.length;j++){
                matriz[i+tam*(j+y1)] = palabra[j];
              }
            }

            else if(y1==y0 && x1>x0){
              let j=y0;
              for(let i=0;i<palabra.length;i++){
                matriz[(i+x0)+tam*j] = palabra[i];
              }
            }

            else if(y1==y0 && x1<x0){
              let j=y0;
              for(let i=0;i<palabra.length;i++){
                matriz[(i+x1)+tam*j] = palabra[i];
              }
            }

            else if(x1>x0 && y1>y0){
              let j=y0;
              let i=x0;
              for(let cont=0;cont<palabra.length;cont++){
                matriz[(i+cont)+tam*(j+cont)] = palabra[cont];
              }
            }

            else if(x1<x0 && y1>y0){
              let j=y0;
              let i=x0;
              for(let cont=0;cont<palabra.length;cont++){
                matriz[(i-cont)+tam*(j+cont)] = palabra[cont];
              }
            }

            else if(x1>x0 && y1<y0){
              let j=y0;
              let i=x0;
              for(let cont=0;cont<palabra.length;cont++){
                matriz[(i+cont)+tam*(j-cont)] = palabra[cont];
              }
            }

            else if(x1<x0 && y1<y0){
              let j=y0;
              let i=x0;
              for(let cont=0;cont<palabra.length;cont++){
                matriz[(i-cont)+tam*(j-cont)] = palabra[cont];
              }
            }

            respuestasm.push(sub_element.answer);
          });
          this.respuestas_correctas.push({id: element.id, resp: respuestasm, matriz: matriz});
          break;

          case '6':
            let respuestasc = [];
            (<any>element.respuestas).forEach(sub_element => {
              respuestasc.push(sub_element.answer);
            })
            this.respuestas_correctas.push({id: element.id, resp: respuestasc, matriz: element.matriz})
          break;
      }
    });
  }

  click_verdadero(id){
    this.respuestas_alumno[id-1] = {id: id, resp: ["true"], matriz: []};
  }

  click_falso(id){
    this.respuestas_alumno[id-1] = {id: id, resp: ["false"], matriz: []};
  }

  respuesta_desarrollada(id,event){
    this.respuestas_alumno[id-1] = {id: id, resp: [event.target.value.toLowerCase()], matriz: []};
  }

  respuesta_multiple(id,texto){

    if(!this.respuestas_alumno[id-1]){
      this.respuestas_alumno[id-1] = {id: id, resp: [texto], matriz: []};
    }
    else{
      
      if(!this.respuestas_alumno[id-1].resp.includes(texto)){
        this.respuestas_alumno[id-1].resp.push(texto);
      }
      else{
        this.respuestas_alumno[id-1].resp = this.respuestas_alumno[id-1].resp.filter(element => element!=texto);
      }
    }
  }

  click_sopa(pregunta,i,j,letra){
    
    let tam = pregunta.tam_matriz;
    let index = pregunta.id-1;
    let pos = i*tam+j;

    if(!this.respuestas_alumno[index]){
      this.respuestas_alumno[index] = {id: index+1, resp: [], matriz: []};

      for(let i=0;i<tam*tam;i++)
        this.respuestas_alumno[index].matriz.push('');

      this.respuestas_alumno[index].matriz[pos] = letra; 
      pregunta.matriz_color[i][j] = 'skyblue';
    }
    else{

      if(this.respuestas_alumno[index].matriz[pos] != ""){
        this.respuestas_alumno[index].matriz[pos] = "";
        pregunta.matriz_color[i][j] = 'white';
      }
      else{
        this.respuestas_alumno[index].matriz[i*tam+j] = letra; 
        pregunta.matriz_color[i][j] = 'skyblue';
      }
    }
  }

  
  input_crucigrama(pregunta,i,j,letra){
    let tam = pregunta.tam_matriz;
    let index = pregunta.id-1;
    let pos = i*tam+j;

    if(!this.respuestas_alumno[index]){
      this.respuestas_alumno[index] = {id: index+1, resp: [], matriz: []};

      for(let i=0;i<tam*tam;i++)
        this.respuestas_alumno[index].matriz.push('');

      this.respuestas_alumno[index].matriz[pos] = letra; 
    }
    else{

      if(this.respuestas_alumno[index].matriz[pos] != ""){
        this.respuestas_alumno[index].matriz[pos] = "";
      }
      else{
        this.respuestas_alumno[index].matriz[i*tam+j] = letra; 
      }
    }
  }

  calificar(){
    this.ver_calificacion = true;
    this.correctas = 0;
    this.total = this.respuestas_correctas.length;

    //establecer valores por default
    for(let i=0;i<this.preguntas_graficas.length;i++){
      switch(this.preguntas_graficas[i].tipo){
        case '1':
            if(this.respuestas_correctas[i].resp[0])
              this.preguntas_graficas[i].calificacion = {correcta: false, respuesta: 'Verdadero'};
            else
              this.preguntas_graficas[i].calificacion = {correcta: false, respuesta: 'Falso'};
          break;

        case '2':        
          this.preguntas_graficas[i].calificacion = {correcta: true, respuesta: 'Esta respuesta es libre, queda a discreción del catedrático.'};
          break;
        
        case '3':
          this.preguntas_graficas[i].calificacion = {correcta: false, respuesta: this.respuestas_correctas[i].resp[0]};
          break;

        case '4':
          let respuesta = '';
          this.respuestas_correctas[i].resp.forEach(element => respuesta += element + ", ");
          respuesta = respuesta.slice(0,-2);
          this.preguntas_graficas[i].calificacion = {correcta: false, respuesta: respuesta};
          break;
        
        case '5':     
          let respuestam = '';             
          let tam = this.preguntas_graficas[i].tam_matriz;
          
          for(let j=0;j<this.respuestas_correctas[i].matriz.length;j++){
              let x = Math.trunc(j/tam);
              let y = j%tam;
              
              if(this.respuestas_correctas[i].matriz[j] != "")
                this.preguntas_graficas[i].matriz_color[x][y] = 'yellow';
          }

          this.respuestas_correctas[i].resp.forEach(element => {respuestam += element + ", "})
          respuestam = respuestam.slice(0,-2);
          this.preguntas_graficas[i].calificacion = {correcta: false, respuesta: respuestam};
          break;
        
        case '6':
          let tamc = this.preguntas_graficas[i].tam_matriz;
          console.log('graficas-->',this.preguntas_graficas[i]);
          console.log('respuestas-->',this.respuestas_correctas[i]);
          for(let j=0;j<this.respuestas_correctas[i].matriz.length-1;j++){
              let x = Math.trunc(j/tamc);
              let y = j%tamc;
              
              if(this.respuestas_correctas[i].matriz[j] != ""){
                this.preguntas_graficas[i].matriz_color[x][y] = 'yellow';
                this.preguntas_graficas[i].matriz[x][y] = this.respuestas_correctas[i].matriz[j];
              }
          }
          let respuestac = '';
          this.respuestas_correctas[i].resp.forEach(element => {respuestac += element + ", "})
          respuestac = respuestac.slice(0,-2);
          this.preguntas_graficas[i].calificacion = {correcta: false, respuesta: respuestac};           
          break;
      }
    }

    //rellenar preguntas del alumno por si no ha respondido todas
    for(let i=0;i<this.respuestas_alumno.length;i++){
      if(this.respuestas_alumno[i]==null)
        this.respuestas_alumno[i] = {id: -1, resp: [], matriz: []};
    }

    //realizar la comparacion de respuestas correctas con respuestas del estudiante
    for(let i=0;i<this.preguntas_graficas.length;i++){
      
      let id = this.preguntas_graficas[i].id;
      let resp_alumno = this.respuestas_alumno.filter(element=> element.id==id)[0];
      let resp_correcta = this.respuestas_correctas.filter(element=> element.id==id)[0];
      
      if(resp_alumno == null)
        continue;

      switch(this.preguntas_graficas[i].tipo){
        case '1': case '3':
            if(resp_alumno.resp[0] == resp_correcta.resp[0]){
              this.preguntas_graficas[i].calificacion.correcta = true;
              this.correctas++;
            }
          break;
        
        case '2':
          if(resp_alumno.resp[0] != "")
            this.correctas++;
          break;
        
        case '4':
          if(resp_alumno != null && resp_alumno.resp.length == resp_correcta.resp.length){
            let esCorrecta = true;

            resp_correcta.resp.forEach(element => {
              let resultados = resp_alumno.resp.filter(resp => resp == element);
              if(resultados.length==0){
                esCorrecta = false;
              }
            })

            this.preguntas_graficas[i].calificacion.correcta = esCorrecta;
            this.correctas += esCorrecta? 1:0;
          }
          break;
        
        case '5':
          if(resp_alumno != null && resp_alumno.matriz != null && resp_alumno.matriz.length >0){
            let esCorrecta = true;
            let tam = this.preguntas_graficas[i].tam_matriz;
            for(let j=0;j<resp_correcta.matriz.length;j++){

              if(resp_correcta.matriz[j] != resp_alumno.matriz[j] && resp_correcta.matriz[j] != ""){
                esCorrecta = false;
              }
              else if(resp_correcta.matriz[j] == resp_alumno.matriz[j] && resp_correcta.matriz[j] != ""){
                let x = Math.trunc(j/tam);
                let y = j%tam;
                this.preguntas_graficas[i].matriz_color[x][y] = 'skyblue';
              }
            }
            this.preguntas_graficas[i].calificacion.correcta = esCorrecta;
            this.correctas += esCorrecta? 1:0;
          }
          break;
        
        case '6':
          if(resp_alumno != null && resp_alumno.matriz != null && resp_alumno.matriz.length >0){
            let esCorrecta = true;
            let tam = this.preguntas_graficas[i].tam_matriz;
            for(let j=0;j<resp_correcta.matriz.length-1;j++){

              if(resp_correcta.matriz[j].toLowerCase() != resp_alumno.matriz[j].toLowerCase() && resp_correcta.matriz[j] != ""){
                esCorrecta = false;
              }
              else if(resp_correcta.matriz[j].toLowerCase() == resp_alumno.matriz[j].toLowerCase() && resp_correcta.matriz[j] != ""){
                let x = Math.trunc(j/tam);
                let y = j%tam;
                this.preguntas_graficas[i].matriz_color[x][y] = 'white';
              }
            }
            this.preguntas_graficas[i].calificacion.correcta = esCorrecta;
            this.correctas += esCorrecta? 1:0;
          }
          break;
      }

    }

  }

}
