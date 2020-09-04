import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NuevacargaComponent } from '../../components/nuevacarga/nuevacarga.component';
import { ListCatalogsService } from '../../services/web/list-catalogs.service';
import { ListaCargas, Carga } from '../../models/carga.model';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CargaComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  columnsToDisplay = [
    {key: 'filesVersion', header: 'versión del catálogo'},
    {key: 'status', header: 'estatus'},
    {key: 'filesId', header: 'id de carga'}
  ];
  columnsToDisplayKeys = this.columnsToDisplay.map(col => col.key);

  expandedElement: Carga | null;
  dataSource = null;

  catType: string;
  listCats: ListaCargas;

  decimalPipe = new DecimalPipe(navigator.language);

  constructor( private activatedRoute: ActivatedRoute,
               private router: Router,
               private listCatService: ListCatalogsService,
               public dialog: MatDialog ) {
    this.activatedRoute.queryParams.subscribe( params => {
      if ( ['entidades', 'municipios', 'localidades'].includes(params.catalogo) ) {
        this.catType = params.catalogo;
      } else {
        this.router.navigateByUrl('inicio');
      }
    });
  }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Por página';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
    };

    this.listCatService.getCats(this.catType).subscribe((resp: ListaCargas) => {
      this.dataSource = new MatTableDataSource(resp.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  seguimiento(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NuevacargaComponent, {
      data: {catType: this.catType}
    }).updatePosition({ top: '5rem' });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
