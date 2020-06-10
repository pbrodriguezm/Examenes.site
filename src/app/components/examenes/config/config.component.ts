import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {  MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

import { DatePipe } from '@angular/common';

//servicios propios
import { EvaExamenesService } from '../../../../services/api/evaExamenes.service';


//Modelos propios
import { EvaExamenes } from '../../../../services/model/evaExamenes';



@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
  providers: [DatePipe]
})
export class ConfigComponentExamen implements OnInit {
  evaExamen:EvaExamenes={
    nombre: '',
    descripcion: '',
    fechainicio: new Date()+'',
    fechafin: this.dateAsYYYYMMDDHHNNSS(new Date()),
    validacion: 0,
  };
 
  nuevo=false;
  public selectedMoment = new Date();
  titulo='Agregar examen';
  horainicia='12:00';
  horatermina='13:00';
  //evaExamen.fechainicio
  //evaExamen.fechafin


  constructor(
    protected datePipe: DatePipe,
    private _snackBar: MatSnackBar,
    protected evaExamenesService:EvaExamenesService,
    public dialogRef: MatDialogRef<ConfigComponentExamen>,
    @Inject(MAT_DIALOG_DATA) public data:any) { 
      //console.log(data.evaExamen);
      if(data.evaExamen == null || data.evaExamen ==undefined){
        this.nuevo=true;
   
      }else{     
        this.evaExamen= data.evaExamen;

        this.titulo=data.evaExamen.nombre;
        this.nuevo=false;
        let hinicio= new Date(data.evaExamen.fechainicio);
        let hf= new Date(data.evaExamen.fechafin);
    
        this.horainicia = hinicio.getHours()+':'+hinicio.getMinutes();
        this.horatermina = hf.getHours()+':'+hf.getMinutes();
        
      }
      
    }

  ngOnInit(): void {

  }

  guardarCambios(){

    

    
    //this.evaExamen.fechainicio=this.datePipe.transform(this.evaExamen.fechainicio, 'yyyy-MM-dd')+' '+this.horainicia;
    
    //this.evaExamen.fechafin= this.datePipe.transform(this.evaExamen.fechafin, 'yyyy-MM-dd')+' '+this.horatermina;
    

    if(this.nuevo){
    this.evaExamenesService.evaExamenesPost(this.evaExamen,null,'return=representation').subscribe(data => {
      this.openSnackBar('Datos guardados correctamente', 'cerrar');
    }, error => {
      this.openSnackBar('ERROR no se logró guardar', 'cerrar error');
    })
    }else{    
  
      this.evaExamenesService.evaExamenesPatch('eq.'+this.evaExamen.idexamen,null,null,null,null,null,null,'codigoexterno,descripcion,fechafin,fechainicio,idexamen,idusuario,nombre',this.evaExamen).subscribe(respose => {
        console.log(respose);
        this.openSnackBar('Datos actualizados correctamente', 'cerrar');
      }, error => {
        console.log(error);
        this.openSnackBar('ERROR no se logró guardar '+error.error.code, 'cerrar error');
      })
    }
  }

  openSnackBar(texto, boton) {
    this._snackBar.open(texto, boton, {
      duration: 4000,
    });
  }

  dateAsYYYYMMDDHHNNSS(date): string {
    return date.getFullYear()
              + '-' + this.leftpad(date.getMonth() + 1, 2)
              + '-' + this.leftpad(date.getDate(), 2)
              + ' ' + this.leftpad(date.getHours(), 2)
              + ':' + this.leftpad(date.getMinutes(), 2)
              + ':' + this.leftpad(date.getSeconds(), 2);
  }
  
  leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
          + String(val)).slice(String(val).length);
  }
}


