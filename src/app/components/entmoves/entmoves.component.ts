import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SeguimientoService } from '../../services/web/seguimiento.service';

@Component({
  selector: 'app-entmoves',
  templateUrl: './entmoves.component.html',
  styleUrls: ['./entmoves.component.css']
})
export class EntmovesComponent implements OnInit {

  @Input() data: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  columnsToDisplay = [
    {key: 'id', header: 'ID'},
    {key: 'cve_ent', header: 'Clave'},
    {key: 'nom_ent', header: 'Entidad'},
    {key: 'descgo_act', header: 'Movimiento'},
    {key: 'mov_inegi', header: 'INEGI'},
    {key: 'ent', header: 'Entidad Ori'},
    {key: 'snap_id', header: 'Snap ID'},
  ];
  columnsToDisplayKeys = this.columnsToDisplay.map(col => col.key);

  dataSource: any;

  constructor( private segService: SeguimientoService ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.dataSource = new MatTableDataSource(this.data.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  changeValue(i, $event): void {
    if ($event.keyCode == 13) {
      console.log("changeValue enter");
      console.log(i, $event);
      console.log($event.target.textContent);
      $event.target.children[0].innerText = $event.target.textContent
    }
  }

  updateList($event): void {
    console.log("updateList");
  }

  remove(id): void {
    console.log("remove");
  }

  add(): void {
    console.log("add");
  }

}
