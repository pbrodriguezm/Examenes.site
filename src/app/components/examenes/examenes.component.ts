import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

//Mis servicios
import { EvaExamenesService } from '../../../services/api/evaExamenes.service';
import { EvaExamenUsuariosService } from '../../../services/api/evaExamenUsuarios.service';
import { EvaPreguntasService } from '../../../services/api/evaPreguntas.service'

//Mis modelos
import { EvaExamenes } from '../../../services/model/evaExamenes';
import { EvaluadosComponent } from './evaluados/evaluados.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { ConfigComponent } from './preguntas/config/config.component';
import { ConfigComponentExamen } from './config/config.component';



@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent implements OnInit {


  //Mis variables
   evaExamenes: any[]=[];//EvaExamenes
   cantPostulante=0;
   cantPreguntas=0;
   
  cargando:boolean=false;

  constructor(public dialog: MatDialog,
    protected evaExamenesService:EvaExamenesService,
    protected evaExamenUsuariosService:EvaExamenUsuariosService,
    protected evaPreguntasService:EvaPreguntasService) { }


  panelOpenState = false;
  ngOnInit(): void {
    this.cargarExamenes();

  }

  cargarExamenes(){
    this.cargando=true;
    this.evaExamenesService.evaExamenesGet().subscribe(data =>{
      this.evaExamenes = data;
    })
    this.cargando=false;

  }

  cargarDatosExamen(evaExamen){
   
    this.cargando=true;
    this.caragarAlumnos(evaExamen);
    this.caragarPreguntas(evaExamen);
    this.cargando=false;
    

  }

  caragarAlumnos(evaExamen){
    this.evaExamenUsuariosService.evaExamenUsuariosGet('eq.'+evaExamen.idexamen).subscribe(data=>{
      evaExamen.usuarios=data;
      this.cantPostulante=data.length;
      
    })
  }


  caragarPreguntas(evaExamen){
    this.evaPreguntasService.evaPreguntasGet(null,'eq.'+evaExamen.idexamen).subscribe(data=>{
      evaExamen.preguntas=data;
      this.cantPreguntas=data.length;
      
    })
  }

  //Ventana de diologo para Evaluacion
  openDialogEvaluados(evaExamen) {

    const dialogRef = this.dialog.open(EvaluadosComponent, {
      data: {
        evaExamen: evaExamen,
        cantidad: this.cantPostulante
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarDatosExamen(evaExamen);
      //console.log(`Dialog result: ${result}`);
    });
  }

//Ventana de dialogo para Preguntas
  openDialogPregunta(evaExamen) {

    const dialogRef = this.dialog.open(PreguntasComponent, {
      data: {
        evaExamen: evaExamen,
        
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarDatosExamen(evaExamen);
    });
  }

openDialogPreguntaConfig(evaExamen) {

  const dialogRef = this.dialog.open(ConfigComponent, {
    data: {
      evaExamen: evaExamen
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    this.cargarDatosExamen(evaExamen);
  });
}

//CRUD examen
openDialogExamen(evaExamen) {

  const dialogRef = this.dialog.open(ConfigComponentExamen, {
    data: {
      evaExamen: evaExamen

    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

}
