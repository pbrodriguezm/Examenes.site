import { Component, OnInit , Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {  MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

//Servicios Propios
import { EvaPreguntasService } from '../../../../services/api/evaPreguntas.service';
import { EvaPreguntaAlternativasService } from '../../../../services/api/evaPreguntaAlternativas.service';
import { EvaCategoriasService } from '../../../../services/api/evaCategorias.service';


//Modelos Propios
import { EvaPreguntas } from '../../../../services/model/evaPreguntas';
import { EvaPreguntaAlternativas } from '../../../../services/model/evaPreguntaAlternativas';
import { EvaCategorias } from '../../../../services/model/evaCategorias';


import { Papa } from 'ngx-papaparse';
import { RouteConfigLoadEnd } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {



  ngOnInit(): void {

  }

  evaPreguntas:any[]=[];
  errores=null;
  categoriasMap = new Map();
  acciones:string='';
  erroresProceso:string='';

  constructor(private _snackBar: MatSnackBar,
    private papa: Papa,
    protected evaPreguntasService:EvaPreguntasService,
    protected evaCategoriasService:EvaCategoriasService,
    protected evaPreguntaAlternativasService:EvaPreguntaAlternativasService,
    public dialogRef: MatDialogRef<PreguntasComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  
 

  changeListener(files: FileList){
    

    let options = {
      complete: (results, file) => {
          //console.log('Parsed: ', results, file);
          this.errores=results.errors;
          
          let headers= results.data[0];
          
          for (let index = 1; index < results.data.length-1; index++) {
            let zonaAlternativa=false;
              let txtson='{ "idexamen": "'+this.data.evaExamen.idexamen+'", ';
              for (let jindex = 0; jindex < headers.length; jindex++) {
              
               if(headers[jindex]=='catcodigoexterno' ){
                  this.categoriasMap.set( results.data[index][jindex], results.data[index][jindex+1] );
               }

              if(headers[jindex]=='respuesta'  && !zonaAlternativa){
                
                zonaAlternativa=true;
                txtson+='"alternativas": [ ';
              }
              if(zonaAlternativa){
                txtson+=' {'
              }
              if(headers[jindex]=='respuesta' && zonaAlternativa )             {
                txtson+='"alternativa": "'+results.data[index][jindex] + '", "esrespuesta": "1" '
              }else{
                txtson+='"'+headers[jindex]+'": "'+results.data[index][jindex] + '" '
              }
                  
              if(zonaAlternativa){
                txtson+=' }'
              }
              if(jindex < headers.length-1){ txtson+=', '; }
                 
               }
               txtson+='] }'

               //console.log(txtson);
              
               var jsonPregunta = JSON.parse(txtson);
  
            this.evaPreguntas.push(jsonPregunta);
                       
          }
          
          //console.log(this.evaPreguntas);

          this.actualizarCategorias();
      }
      // Add your options here
  };


    if(files && files.length > 0) {
       let file : File = files.item(0); 
         //console.log(file.name);
         //console.log(file.size);
         //console.log(file.type);
         let reader: FileReader = new FileReader();
         reader.readAsText(file);
         reader.onload = (e) => {
            let csv: string = reader.result as string;
            //console.log(csv);
            this.papa.parse(csv,options);
         }
      }
  
      //Iniciamos creando categorias
   
   
  }

  actualizarCategorias(){

     console.log('>>'+this.data.evaExamen.idexamen);

        //Agregar Categorias a rest
        this.evaCategoriasService.evaCategoriasDelete(null,'eq.'+this.data.evaExamen.idexamen).subscribe(data=>{
          this.acciones+='** Eliminando CATEGORIAS anteriores.';
        }, error =>{
          this.erroresProceso+='** ERROR (No podemos eliminar las categorias). ';
          this. openSnackBar('No podemos eliminar categorias', 'cerrar error')
           
       });

    for (const [key, value]  of this.categoriasMap.entries()) {
        let categoriaTMP:EvaCategorias={
          idexamen: this.data.evaExamen.idexamen,
          catcodigoexterno: key,
          nombre: value,
          
        };

        this.evaCategoriasService.evaCategoriasPost(categoriaTMP,null,'return=representation').subscribe(subscribe => {
          this.acciones+='** Creando categoria '+categoriaTMP.nombre;
          this.actualizarDB();
        }, error =>{
          this.erroresProceso+='** ERROR (No podemos crear categoria '+categoriaTMP.catcodigoexterno+', recuerde el código debe ser màximo 10 caracteres). '
          this. openSnackBar('No hemos podido crear categorias para sus preguntas', 'cerrar error')
           
       })
    }
    
  }

  actualizarDB(){
    this.evaPreguntasService.evaPreguntasDelete(null,'eq.'+this.data.evaExamen.idexamen).subscribe( data =>{
      this.acciones+='** Eliminando rastros de PREGUNTAS anteriores******';

      //Agregar Preguntas
      let countpregunta=1;
      for (const evaPregunta of this.evaPreguntas) {
        this.evaPreguntasService.evaPreguntasPost(evaPregunta, 'idexamen,catcodigoexterno,pregunta,descripcion,puntaje,imagenurl','return=representation').subscribe(response => {
          this.acciones+='**Creando PREGUNTA.'+countpregunta;
          countpregunta++;
        }, error =>{
          this.erroresProceso+='** ERROR (en la pregunta nº '+countpregunta+')';
        })  
      }


    }, error =>{
      this.erroresProceso+='** ERROR: (eliminado preguntas anteriores)';
       this. openSnackBar('No podemos actualizar las preguntas para este examen', 'cerrar error');
        
    }
    )


  
  }

  openSnackBar(texto, boton) {
    this._snackBar.open(texto, boton, {
      duration: 4000,
    });
  }
}

