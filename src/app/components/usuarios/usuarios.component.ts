import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsersComponent } from './users/users.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { AlumnosComponent } from './alumnos/alumnos.component';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogUsers(): void {
    const dialogRef = this.dialog.open(UsersComponent, {
      width: '315px',
      data: {name: 'nada'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
 
    });
  }


  openDialogProfesores(): void {
    const dialogRef = this.dialog.open(ProfesoresComponent, {
      width: '310px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  openDialogAlumnos(): void {
    const dialogRef = this.dialog.open(AlumnosComponent, {
      width: '310px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
