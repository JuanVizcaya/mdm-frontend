import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.css']
})
export class EntidadesComponent implements OnInit {

  verCatalogo = false;
  carga = false;
  apis = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe( params => {
      if ( params.action === 'ver' ) {
        this.verCatalogo = true;
      } else if ( params.action === 'carga' ) {
        this.carga = true;
      } else if ( params.action === 'apis' ) {
        this.apis = true;
      } else {
        this.router.navigateByUrl('entidades?action=ver');
      }
    });
  }

}
