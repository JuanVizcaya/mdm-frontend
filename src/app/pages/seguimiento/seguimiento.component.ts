import { Component, OnInit } from '@angular/core';
import { SeguimientoService } from '../../services/web/seguimiento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Seguimiento, Carga } from '../../models/carga.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  showSeguimiento = true;
  showResultados = false;
  showDatos = false;
  loading = true;

  idCarga: string;
  data: Seguimiento;
  dataDatos: any;
  buttons: number[] = [];

  constructor( private seguimientoService: SeguimientoService,
               private aRoute: ActivatedRoute,
               private router: Router ) {
      this.idCarga = this.aRoute.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
      this.getData();
    }

    getData(): void {
      this.seguimientoService.getStatus(this.idCarga)
      .subscribe((resp: Seguimiento) => {
        this.data = resp;
        this.buttons = [];
        this.data.dataSeguimiento.buttons.split('-')
          .forEach( num => this.buttons.push(parseInt(num, 10)) );

        if ( this.data.dataResultados ) {
          this.showResultados = true;
        }
        if ( this.data.dataDatosExists ) {
          this.showDatos = true;
          this.fillDatos();
        }
        this.loading = false;
      },
      err => {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: err.error.error,
          text: 'Redireccionando..',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onAfterClose: () => {
            this.router.navigateByUrl('inicio');
          }
        });
      }
      );
    }

    fillDatos(): void {
      this.seguimientoService.getDatos(this.idCarga)
      .subscribe( resp => {
        this.dataDatos = resp;
        // console.log(this.dataDatos);
      });
    }

    validacion(): void {
      let timerInterval: number;
      Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        title: 'Validación inicial',
        html: 'Estatus: <p></p>',
        onBeforeOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {
            this.getData();
            const content = Swal.getContent();
            if (content) {
              const p = content.querySelector('p');
              if (p) {
                p.textContent = this.data.dataSeguimiento.nextStep;
              }
            }
          }, 500);
        },
        onClose: () => {
          clearInterval(timerInterval);
        }
      });

      this.seguimientoService.validacion(this.idCarga)
        .subscribe(resp => {
          this.getData();
          Swal.close();
        });
    }



    cancelar(): void {}

  }
