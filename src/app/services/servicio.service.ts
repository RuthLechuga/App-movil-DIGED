import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  url_api = "https://desarrollo.virtual.usac.edu.gt/DEDEV/Api";

  constructor(private httpClient: HttpClient) { }

  getCursos(){
    const url = `${this.url_api}/cursos`;
    return new Promise(resolve => {
      this.httpClient.get(url)
      .subscribe(resp => {
        resolve(resp);
      });
    });
  }

  getTemas(id){
    const url = `${this.url_api}/temas/${id}`;
    return new Promise(resolve => {
      this.httpClient.get(url)
      .subscribe(resp => {
        resolve(resp);
      });
    });
  }

  getDetalleTema(id_tema){
    const url = `${this.url_api}/img/${id_tema}`;
    return new Promise(resolve => {
      this.httpClient.get(url)
      .subscribe(resp => {
        resolve(resp);
      })
    })
  }

  getContenido(id_titulo){
    const url = `${this.url_api}/titulo/${id_titulo}`;
    return new Promise(resolve => {
      this.httpClient.get(url)
      .subscribe(resp => {
        resolve(resp);
      })
    })
  }

  getComprobacion(id_titulo){
    const url = `${this.url_api}/comprobacion/${id_titulo}`;
    return new Promise(resolve => {
      this.httpClient.get(url)
      .subscribe(resp => {
        resolve(resp);
      })
    })
  }

}
