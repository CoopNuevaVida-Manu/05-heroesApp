import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import {switchMap} from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfimarComponent } from '../../components/confimar/confimar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
    width: 100%;
    border-radius: 5px;
  }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe ={
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor( private heroeServices: HeroesService, 
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private snackbar : MatSnackBar,
                private matDialog : MatDialog) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.heroeServices.getHeroePorId(id) )
    )
    .subscribe( heroe => this.heroe = heroe)
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return
    }

    if(this.heroe.id){
      ///Actualizar
      this.heroeServices.actualizarHeroe(this.heroe).subscribe(resp => this.mostrarSnackbar('Registro Actualizado'))
    }else{
      //Crear
      this.heroeServices.agregarHeroe(this.heroe).subscribe(heroe => {
        this.router.navigate(['/heroes/editar', heroe.id])});
        this.mostrarSnackbar('Se creo el personaje satisfactoriamente')
    }
    
  }
  borrar(){
    const dialog = this.matDialog.open(ConfimarComponent, {
      width: '350px',
      data: this.heroe
    })

    dialog.afterClosed().subscribe(
      result => {
        if(result){
          this.heroeServices.borrarHeroe( this.heroe.id ! ).subscribe(resp => this.router.navigate(['/heroes']));
        }
      }
    )
  }

  mostrarSnackbar(mensaje : string){
    this.snackbar.open( mensaje, 'ok!', {
      duration: 2500
    })
  }
}
