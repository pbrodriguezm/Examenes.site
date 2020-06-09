import { Component, OnInit } from '@angular/core';

//Servicios propios
import { EvaLoginsService } from '../../../services/api/evaLogins.service';
import { EvaUlasalleService, } from '../../../services/api/eva-ulasalle.service';
 
 

//Modelos propios
import { EvaLogins} from '../../../services/model/evaLogins';
import { EvaUlasalle,EvaUlasalleLogin } from '../../../services/model/evaUlasalle';
import {Md5} from 'ts-md5/dist/md5';


@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.css']
})
export class VerificacionComponent implements OnInit {

  //Variables propias
  evaLogins:EvaLogins[]=[];
  paraverficiar=false;
  codigoValidacion;
  cargandoDetalle=true;
  evaUlasalle:EvaUlasalle
  evaUlasalleLogin:EvaUlasalleLogin=
  {
    dni: '',
    tokenid: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImM1ODV',
    navegador:'opera',
    ip: '192.168.10.10',
    ubicacion: 'examenes app'
  }

  constructor(
    protected evaLoginsService:EvaLoginsService,
    protected evaUlasalleService:EvaUlasalleService
  ) { }

  interval;
  time: number = 0;
  ngOnInit(): void {
    this.cargandoDetalle=true;
    this.cargarVisitas();
    this.interval = setInterval(() => {
      this.time++;
      if(this.time==10){
        this.cargarVisitas();
        this.time=0;
      }
    },1000)

  }

  cargarVisitas(){
    console.log('entrando');

   
    this.evaLoginsService.evaLoginsGet().subscribe(data => {
      this.evaLogins=data;
      this.cargandoDetalle=false;
    })
  }

  cargarDataLogin(evaLogin){
    this.cargandoDetalle=true;
    this.evaUlasalleLogin.dni=evaLogin.idusuario;

    this.evaUlasalleService.getEvaUlasalleServiceGet(this.evaUlasalleLogin).subscribe(response => {
      this.paraverficiar=true;
      this.evaUlasalle=response[0];
      this.generarCodigo(evaLogin);
     
      this.cargandoDetalle=false;

    })
    
    

  }


  generarCodigo(evaLogin){
    this.codigoValidacion=Math.floor(10000 + Math.random() * 90000);

    
    if(this.codigoValidacion > 0){
      let md5 = new Md5();
      
      evaLogin.token= md5.appendStr(this.codigoValidacion+'').end();
      console.log(evaLogin);
      this.evaLoginsService.evaLoginsPatch('eq.'+evaLogin.idlogin,null,null,null,null,null,null,null,null,null,evaLogin).subscribe(response => {
        console.log('Token generado');
      }, error => {
        this.codigoValidacion='-----';
      })
    }else{
      this.codigoValidacion='-----';
    }
    
  }

}
