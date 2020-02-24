import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio-sesion', pathMatch: 'full' },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./pages/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'cursos/:nombre',
    loadChildren: () => import('./pages/cursos/cursos.module').then( m => m.CursosPageModule)
  },
  {
    path: 'temas/:nombre/:id_curso/:nombre_curso',
    loadChildren: () => import('./pages/temas/temas.module').then( m => m.TemasPageModule)
  },
  {
    path: 'detalle-tema',
    loadChildren: () => import('./pages/detalle-tema/detalle-tema.module').then( m => m.DetalleTemaPageModule)
  },
  {
    path: 'contenido',
    loadChildren: () => import('./pages/contenido/contenido.module').then( m => m.ContenidoPageModule)
  },
  {
    path: 'comprobacion',
    loadChildren: () => import('./pages/comprobacion/comprobacion.module').then( m => m.ComprobacionPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
