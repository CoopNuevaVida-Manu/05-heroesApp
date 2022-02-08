import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  private baseUrrl : string = environment.baseUrl;

  getHeroes(): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrrl}/heroes`)
  }

  getHeroePorId(id: string):Observable<Heroe>{
    return this.http.get<Heroe>(`${this.baseUrrl}/heroes/${id}`)
  }

  getSugerencias(termino: string):Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrrl}/heroes?q=${termino}&_limit=5`)
  }

  agregarHeroe(heroe: Heroe):Observable<Heroe>{
    return this.http.post<Heroe>(`${this.baseUrrl}/heroes`, heroe);
  }

  actualizarHeroe(heroe: Heroe):Observable<Heroe>{
    return this.http.put<Heroe>(`${this.baseUrrl}/heroes/${heroe.id}`, heroe);
  }
  borrarHeroe(id: string):Observable<any>{
    return this.http.delete<any>(`${this.baseUrrl}/heroes/${id}`);
  }
}
