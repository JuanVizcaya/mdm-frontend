import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListCatalogsService {

  constructor( private http: HttpClient ) { }

  getCats(tipo): Observable<any> {
    return this.http.get(`${environment.urlServ}/admdata/listloads?catalogo=${tipo}`);
  }

}
