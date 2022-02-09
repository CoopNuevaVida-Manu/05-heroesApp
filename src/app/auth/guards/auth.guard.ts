import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {

  constructor( private authServices : AuthService, 
               private router : Router ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //   if( this.authServices.auth.id){
    //     return true
    //   }
    //   console.log('Bloqueado por el AuthGuard - CanActivate');
    // return false;
    return this.authServices.verificaAutenticacion()
            .pipe(
              tap( estarAutenticado => {
                if( !estarAutenticado){
                  this.router.navigate(['./auth/login'])
                }
              })
            )
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean  {
    
      return this.authServices.verificaAutenticacion()
      .pipe(
        tap( estarAutenticado => {
          if( !estarAutenticado){
            this.router.navigate(['./auth/login'])
          }
        })
      )
    
      //   if( this.authServices.auth.id){
    //     return true
    //   }
    //   console.log('Bloqueado por el AuthGuard - CanLoad');
    // return false;
  }
}
