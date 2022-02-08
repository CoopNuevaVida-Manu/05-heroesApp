import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from '../interfaces/auth.interfaces';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = environment.baseUrl;
  private _Usuario : Usuario | undefined;

  get auth(): Usuario{
    return {...this._Usuario!}
  }


  constructor( private http : HttpClient) { }

  login(){
    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      tap(resp => this._Usuario = resp)
    )
  }

}
