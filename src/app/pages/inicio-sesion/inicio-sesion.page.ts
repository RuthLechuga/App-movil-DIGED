import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  loginUser = {
    nombre: '',
    apellido: ''
  }

  constructor(public toastController: ToastController,
              private route: Router) { }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: '¡Datos Insuficientes! Intenta nuevamente.',
      color: 'danger',
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

  async login(fLogin: NgForm) {
    console.log(this.loginUser);

    if(fLogin.invalid)
      this.presentToast();
    else
    {
      this.route.navigate(['/cursos',this.loginUser.nombre]);
    }

  }

}
