import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-confimar',
  templateUrl: './confimar.component.html',
  styles: [
  ]
})
export class ConfimarComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<ConfimarComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Heroe) { }

  ngOnInit(): void {
  }

  borrar(){
    this.dialogRef.close(true);
  }
  cancelar(){
    this.dialogRef.close();
  }
}
