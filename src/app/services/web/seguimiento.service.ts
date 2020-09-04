import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Seguimiento } from '../../models/carga.model';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {

  constructor( private http: HttpClient ) { }

  getStatus( idCarga ): Observable<Seguimiento> {
    return this.http.get<Seguimiento>(`${ environment.urlServ }/admdata/seguimiento?idcarga=${ idCarga }`, {
      headers: new HttpHeaders().set('Authorization', environment.token)
      });
  }

  validacion( idCarga: string ): Observable<Seguimiento> {
    return this.http.get<Seguimiento>(`${ environment.urlServ }/admdata/validacifras?idcarga=${ idCarga }`, {
      headers: new HttpHeaders().set('Authorization', environment.token)
    });
  }

}
