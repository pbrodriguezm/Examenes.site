import { Component, OnInit , Inject} from '@angular/core';
import { Papa } from 'ngx-papaparse';
import {  MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';


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
  resultados=false;

  constructor(private _snackBar: MatSnackBar,
    private papa: Papa,
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

          for (let index = 1; index < results.data.length-1; index++) {
            let evaExamenUsuarioTMP={
               idexamen: this.data.evaExamen.idexamen,
               idusuario: results.data[index][0],
               idrol: results.data[index][1],
               idestado: results.data[index][2]            
            }
            this.evaExamenUsuarios.push(evaExamenUsuarioTMP);
            
            //const element = results.data[index];
            
          }
          this.agregarDatosBD();
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
  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      
      const resultJSON = JSON.stringify(jsonData);
      
      var jsonObjta = JSON.parse(resultJSON);
      this.evaExamenUsuarios= jsonObjta.postulantes;
      //document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
      this. agregarDatosBD();
    }
    reader.readAsBinaryString(file);
  }



  agregarDatosBD(){

    this.evaExamenUsuariosService.evaExamenUsuariosDelete('eq.'+this.data.evaExamen.idexamen).subscribe(response => {
 
      let cant =0;
      for (const evaExamenUsuario of this.evaExamenUsuarios) {    
          evaExamenUsuario.idexamen=this.data.evaExamen.idexamen;
          cant++;
          this.evaExamenUsuariosService.evaExamenUsuariosPost(evaExamenUsuario,null,'return=representation').subscribe( response => {  
          }, error =>{
            this.errores+=error.error.code+', ';
          })
    }
    this.openSnackBar('Se cargó '+cant+ ' usuario', 'cerrar');    
  })
  this.resultados=true;
  }

  openSnackBar(texto, boton) {
    this._snackBar.open(texto, boton, {
      duration: 4000,
    });
  }
}
