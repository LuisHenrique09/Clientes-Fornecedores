import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Atributos } from './Clientes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url = "http://localhost:3000/Atributos";
  constructor(private http: HttpClient) { }

  getHome(): Observable<Atributos[]> {
    return this.http.get<Atributos[]>(this.url);
  }

  save(home: Atributos): Observable<Atributos>{
    return this.http.post<Atributos>(this.url, home);
  }
  
}
