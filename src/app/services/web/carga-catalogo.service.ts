import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NuevaCarga } from '../../models/carga.model';
import { environment } from '../../../environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CargaCatalogoService {

  constructor( private http: HttpClient ) { }

    cargaEntidades( data: NuevaCarga ): Observable<any> {

      const dataPost = new FormData();
      dataPost.append('filesType', data.filesType);
      dataPost.append('filesVersion', data.filesVersion);
      dataPost.append('catLoad', data.catLoad, data.catLoad.name);
      dataPost.append('eqvLoad', data.eqvLoad, data.eqvLoad.name);
      dataPost.append('actLoad', data.actLoad, data.actLoad.name);

      return this.http.post<any>(`${environment.urlServ}/admdata/upload`, dataPost, {
        reportProgress: true,
        observe: 'events',
        headers: new HttpHeaders().set('Authorization', environment.token)
          // .set('Content-Type', 'multipart/form-data')
          // .set('Accept', '*/*')
        }).pipe(
          catchError(this.errorMgmt)
        );
    }

    errorMgmt(error: HttpErrorResponse): Observable<any> {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
}
