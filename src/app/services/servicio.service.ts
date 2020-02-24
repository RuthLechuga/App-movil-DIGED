import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): boolean{

    const data = {email, password};

    /*
      Escribir petición POST para iniciar sesión
    */
    return true;
  }

  getCursos() {}

  getTemas(id: number){}

}
