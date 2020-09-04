import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EntidadesComponent } from './pages/entidades/entidades.component';
import { CargaComponent } from './pages/carga/carga.component';
import { SeguimientoComponent } from './pages/seguimiento/seguimiento.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'entidades', component: EntidadesComponent },
  { path: 'carga', component: CargaComponent },
  { path: 'seguimiento/:id', component: SeguimientoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
