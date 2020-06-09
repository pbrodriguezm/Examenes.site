import { Component, OnInit , Inject} from '@angular/core';
import { Papa } from 'ngx-papaparse';


//MIs servicios
import { EvaExamenUsuariosService } from '../../../../services/api/evaExamenUsuarios.service';
import { EvaExamenUsuarios } from '../../../../services/model/evaExamenUsuarios';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-evaluados',
  templateUrl: './evaluados.component.html',
  styleUrls: ['./evaluados.component.css']
})
export class EvaluadosComponent implements OnInit {
  
  evaExamenUsuarios:EvaExamenUsuarios[]=[];
  errores;

  constructor(private papa: Papa,
    protected evaExamenUsuariosService:EvaExamenUsuariosService,
    public dialogRef: MatDialogRef<EvaluadosComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {

  }

 

  changeListener(files: FileList){
    console.log(files);

    let options = {
      complete: (results, file) => {
          console.log('Parsed: ', results, file);
          this.errores=results.errors;

          for (let index = 1; index < results.data.length; index++) {
            let evaExamenUsuarioTMP={
               idexamen: this.data.evaExamen.idexamen,
               idusuario: results.data[index][0],
               idrol: results.data[index][1],
               idestado: results.data[index][2]            
            }
            this.evaExamenUsuarios.push(evaExamenUsuarioTMP);
            
            //const element = results.data[index];
            
          }
          console.log(this.evaExamenUsuarios);
      }
      // Add your options here
  };


    if(files && files.length > 0) {
       let file : File = files.item(0); 
         console.log(file.name);
         console.log(file.size);
         console.log(file.type);
         let reader: FileReader = new FileReader();
         reader.readAsText(file);
         reader.onload = (e) => {
            let csv: string = reader.result as string;
            console.log(csv);
            this.papa.parse(csv,options);
         }
      }

      
  }
}
