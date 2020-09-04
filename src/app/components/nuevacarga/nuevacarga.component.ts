import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NuevaCarga, StatusCarga } from '../../models/carga.model';
import { CargaCatalogoService } from '../../services/web/carga-catalogo.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-nuevacarga',
  templateUrl: './nuevacarga.component.html',
  styleUrls: ['./nuevacarga.component.css']
})
export class NuevacargaComponent implements OnInit {

  forma: FormGroup;

  aniosCalendario = [];
  mesesCalendario = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10' , '11', '12'];

  catType: string;

  carga = new NuevaCarga();

  catLabel = 'Catálogo';
  actLabel = 'Registro de actualización';
  eqvLabel = 'Tabla de equivalencias';

  step = 0;
  loadProgress = 0;
  loadResponse = new StatusCarga();

  constructor( private fB: FormBuilder,
               private cargaService: CargaCatalogoService ,
               public dialogRef: MatDialogRef<NuevacargaComponent>,
               @Inject(MAT_DIALOG_DATA) public data
              ) {
    this.catType = data.catType;
    const currentYear = new Date().getFullYear();
    let startYear = 2000;
    while ( startYear <= currentYear ) {
      this.aniosCalendario.push( startYear++ );
    }

    this.makeForm();
  }

  ngOnInit(): void {
  }

  get anioInvalido(): boolean {
    return this.forma.get('anio').invalid && this.forma.get('anio').touched;
  }
  get mesInvalido(): boolean {
    return this.forma.get('mes').invalid && this.forma.get('mes').touched;
  }
  get catalogoInvalido(): boolean {
    return this.forma.get('catalogo').invalid && this.forma.get('catalogo').touched;
  }
  get actualizacionInvalido(): boolean {
    return this.forma.get('actualizacion').invalid && this.forma.get('actualizacion').touched;
  }
  get equivalenciasInvalido(): boolean {
    return this.forma.get('equivalencias').invalid && this.forma.get('equivalencias').touched;
  }

  makeForm(): void {
    this.forma = this.fB.group({
      anio: ['', [Validators.required]],
      mes: ['', [Validators.required]],
      catalogo: [null, [Validators.required, RxwebValidators.extension({extensions: ['csv']})]],
      actualizacion: [null, [Validators.required, RxwebValidators.extension({extensions: ['csv']})]],
      equivalencias: [null, [Validators.required, RxwebValidators.extension({extensions: ['csv']})]]
    });
  }

  selectedCatalogo(event): void {
    if ( event.target.files ) {
      this.carga.catLoad = event.target.files[0];
      this.catLabel = this.carga.catLoad.name;
    }
  }

  selectedActualizacion(event): void {
    if ( event.target.files ) {
      this.carga.actLoad = event.target.files[0];
      this.actLabel = this.carga.actLoad.name;
    }
  }

  selectedEquivalencias(event): void {
    if ( event.target.files ) {
      this.carga.eqvLoad = event.target.files[0];
      this.eqvLabel = this.carga.eqvLoad.name;
    }
  }

  disableForm(): void {
    return this.forma.disable();
    // return Object.values( this.forma.controls ).forEach( control => control.disable() );
  }


  enviar(): void {
    // console.log(this.forma);
    if ( this.forma.invalid ) {
      return Object.values( this.forma.controls ).forEach( control => control.markAsTouched() );
    } else {
      this.disableForm();
      this.carga.filesVersion = `${this.forma.controls.anio.value}-${this.forma.controls.mes.value}-15`;
      this.carga.filesType = this.catType;
      // console.log(this.carga);

      this.cargaService.cargaEntidades(this.carga).subscribe( (event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            // console.log('Enviado al servidor');
            break;
          case HttpEventType.ResponseHeader:
            // console.log('El servidor la recibió');
            break;
          case HttpEventType.UploadProgress:
            this.loadProgress = Math.round(event.loaded / event.total * 100);
            // console.log(`Cargado! ${this.loadProgress}%`);
            break;
          case HttpEventType.Response:
            this.loadResponse = event.body;
            // console.log('Proceso finalizado!', event.body);
            setTimeout(() => {
              this.step = 2;
              this.loadProgress = 0;
            }, 1500);
            break;
          }
        if (this.loadProgress === 100 ) {
          this.step = 1;
        }
        }
      );
    }
  }

}
