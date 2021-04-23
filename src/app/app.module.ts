import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EntidadesComponent } from './pages/entidades/entidades.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { CargaComponent } from './pages/carga/carga.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { SeguimientoComponent } from './pages/seguimiento/seguimiento.component';
import { VerComponent } from './pages/ver/ver.component';
import { ApisComponent } from './pages/apis/apis.component';
import { NuevacargaComponent } from './components/nuevacarga/nuevacarga.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FileValidationComponent } from './components/file-validation/file-validation.component';
import { HttpClientModule } from '@angular/common/http';
import { InfoComponent } from './components/file-validation/info.component';
import { EntmovesComponent } from './components/entmoves/entmoves.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    EntidadesComponent,
    SidebarComponent,
    TopbarComponent,
    CargaComponent,
    FooterComponent,
    SeguimientoComponent,
    VerComponent,
    ApisComponent,
    NuevacargaComponent,
    FileValidationComponent,
    InfoComponent,
    EntmovesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    RxReactiveFormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
