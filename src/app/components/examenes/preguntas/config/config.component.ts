import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {  MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

//servicios propios
import { EvaCategoriasService } from '../../../../../services/api/evaCategorias.service';

//modelos propios
import { EvaCategorias } from '../../../../../services/model/evaCategorias';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  evaCategorias:EvaCategorias[]=[];
  constructor(private _snackBar: MatSnackBar,protected evaCategoriasService:EvaCategoriasService,
    public dialogRef: MatDialogRef<ConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(){
    this.evaCategoriasService.evaCategoriasGet(null,'eq.'+this.data.evaExamen.idexamen).subscribe(data =>{
        this.evaCategorias=data;
    })
  }
  guardarCambios(){
    for (const evaCategoria of this.evaCategorias) {
       this.evaCategoriasService.evaCategoriasPatch('eq.'+evaCategoria.catcodigoexterno, 'eq.'+evaCategoria.idexamen,null,null,null,null,null,null,null,evaCategoria).subscribe(response => {
        this.openSnackBar('Se guardaron los cambios', 'cerrar');
       }, err =>{
        this.openSnackBar('ERROR: ocurrio error al guardar', 'cerrar ');
       });
    }
    
  }

  openSnackBar(texto, boton) {
    this._snackBar.open(texto, boton, {
      duration: 4000,
    });
  }

}
