import { Component, OnInit, Input } from '@angular/core';
import { StatusCarga } from '../../models/carga.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { InfoComponent } from './info.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-validation',
  templateUrl: './file-validation.component.html',
  styleUrls: ['./file-validation.component.css']
})
export class FileValidationComponent implements OnInit {

  @Input() uploadResult: any;
  @Input() loadResponse: StatusCarga;

  constructor( private bottomSheet: MatBottomSheet,
               private router: Router ) { }

  ngOnInit(): void {
  }

  goSeguimiento(): void {
    this.router.navigateByUrl(`/seguimiento/${ this.loadResponse.data.filesId }`);
  }

  openBottomSheet(): void {
    this.bottomSheet.open(InfoComponent, {
      direction: 'ltr',
      data: {
        errors: this.loadResponse.errors,
        status: this.loadResponse.status
      },
      disableClose: true
    });
  }

}
