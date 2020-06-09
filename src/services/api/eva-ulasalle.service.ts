import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isNullOrUndefined } from "util";

/*Modelos*/
import { EvaUlasalleLogin,EvaUlasalle } from '../model/evaUlasalle';

import { SERVER_WS_ULS } from '../global/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaUlasalleService {

  constructor(private http: HttpClient) { }

  getEvaUlasalleServiceGet(usuario:EvaUlasalleLogin): Observable<any> {


    const proxyurl = "https://cors-anywhere.herokuapp.com/";

     const headers = { 
      'content-type': 'application/json'
    }  
    
    const body=JSON.stringify(usuario);
    
    return this.http.post(proxyurl+SERVER_WS_ULS+ '/Persona/consultarDatos', body,{'headers':headers})
  }

  

  getCurrentUser(): EvaUlasalle {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user: EvaUlasalle = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }

}
