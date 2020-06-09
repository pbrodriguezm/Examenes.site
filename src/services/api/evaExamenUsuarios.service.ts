/**
 * PostgREST API
 * standard public schema
 *
 * OpenAPI spec version: 7.0.0 (2b61a63)
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { EvaExamenUsuarios } from '../model/evaExamenUsuarios';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class EvaExamenUsuariosService {

    protected basePath = 'http://168.138.150.197:3000';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * 
     * @param idexamen 
     * @param idusuario 
     * @param idrol 
     * @param idestado 
     * @param fecharegistro 
     * @param prefer Preference
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public evaExamenUsuariosDelete(idexamen?: string, idusuario?: string, idrol?: string, idestado?: string, fecharegistro?: string, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe?: 'body', reportProgress?: boolean): Observable<any>;
    public evaExamenUsuariosDelete(idexamen?: string, idusuario?: string, idrol?: string, idestado?: string, fecharegistro?: string, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public evaExamenUsuariosDelete(idexamen?: string, idusuario?: string, idrol?: string, idestado?: string, fecharegistro?: string, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public evaExamenUsuariosDelete(idexamen?: string, idusuario?: string, idrol?: string, idestado?: string, fecharegistro?: string, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe: any = 'body', reportProgress: boolean = false ): Observable<any> {







        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (idexamen !== undefined && idexamen !== null) {
            queryParameters = queryParameters.set('idexamen', <any>idexamen);
        }
        if (idusuario !== undefined && idusuario !== null) {
            queryParameters = queryParameters.set('idusuario', <any>idusuario);
        }
        if (idrol !== undefined && idrol !== null) {
            queryParameters = queryParameters.set('idrol', <any>idrol);
        }
        if (idestado !== undefined && idestado !== null) {
            queryParameters = queryParameters.set('idestado', <any>idestado);
        }
        if (fecharegistro !== undefined && fecharegistro !== null) {
            queryParameters = queryParameters.set('fecharegistro', <any>fecharegistro);
        }

        let headers = this.defaultHeaders;
        if (prefer !== undefined && prefer !== null) {
            headers = headers.set('Prefer', String(prefer));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/vnd.pgrst.object+json',
            'text/csv'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'application/vnd.pgrst.object+json',
            'text/csv'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/eva_examen_usuarios`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param idexamen 
     * @param idusuario 
     * @param idrol 
     * @param idestado 
     * @param fecharegistro 
     * @param select Filtering Columns
     * @param order Ordering
     * @param range Limiting and Pagination
     * @param rangeUnit Limiting and Pagination
     * @param offset Limiting and Pagination
     * @param limit Limiting and Pagination
     * @param prefer Preference
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public evaExamenUsuariosGet(idexamen?: string, idusuario?: string, idrol?: string, idestado?: string, fecharegistro?: string, select?: string, order?: string, range?: string, rangeUnit?: string, offset?: string, limit?: string, prefer?: 'count=none', observe?: 'body', reportProgress?: boolean): Observable<Array<EvaExamenUsuarios>>;
    public evaExamenUsuariosGet(idexamen?: string, idusuario?: string, idrol?: string, idestado?: string, fecharegistro?: string, select?: string, order?: string, range?: string, rangeUnit?: string, offset?: string, limit?: string, prefer?: 'count=none', observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<EvaExamenUsuarios>>>;
    public evaExamenUsuariosGet(idexamen?: string, idusuario?: string, idrol?: string, idestado?: string, fecharegistro?: string, select?: string, order?: string, range?: string, rangeUnit?: string, offset?: string, limit?: string, prefer?: 'count=none', observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<EvaExamenUsuarios>>>;
    public evaExamenUsuariosGet(idexamen?: string, idusuario?: string, idrol?: string, idestado?: string, fecharegistro?: string, select?: string, order?: string, range?: string, rangeUnit?: string, offset?: string, limit?: string, prefer?: 'count=none', observe: any = 'body', reportProgress: boolean = false ): Observable<any> {













        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (idexamen !== undefined && idexamen !== null) {
            queryParameters = queryParameters.set('idexamen', <any>idexamen);
        }
        if (idusuario !== undefined && idusuario !== null) {
            queryParameters = queryParameters.set('idusuario', <any>idusuario);
        }
        if (idrol !== undefined && idrol !== null) {
            queryParameters = queryParameters.set('idrol', <any>idrol);
        }
        if (idestado !== undefined && idestado !== null) {
            queryParameters = queryParameters.set('idestado', <any>idestado);
        }
        if (fecharegistro !== undefined && fecharegistro !== null) {
            queryParameters = queryParameters.set('fecharegistro', <any>fecharegistro);
        }
        if (select !== undefined && select !== null) {
            queryParameters = queryParameters.set('select', <any>select);
        }
        if (order !== undefined && order !== null) {
            queryParameters = queryParameters.set('order', <any>order);
        }
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', <any>offset);
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', <any>limit);
        }

        let headers = this.defaultHeaders;
        if (range !== undefined && range !== null) {
            headers = headers.set('Range', String(range));
        }
        if (rangeUnit !== undefined && rangeUnit !== null) {
            headers = headers.set('Range-Unit', String(rangeUnit));
        }
        if (prefer !== undefined && prefer !== null) {
            headers = headers.set('Prefer', String(prefer));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/vnd.pgrst.object+json',
            'text/csv'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'application/vnd.pgrst.object+json',
            'text/csv'
        ];

        return this.httpClient.get<Array<EvaExamenUsuarios>>(`${this.basePath}/eva_examen_usuarios`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param idexamen 
     * @param idusuario 
     * @param idrol 
     * @param idestado 
     * @param fecharegistro 
     * @param evaExamenUsuarios eva_examen_usuarios
     * @param prefer Preference
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public evaExamenUsuariosPatch(idexamen?: string, idusuario?: string, idrol?: string, idestado?: string, fecharegistro?: string, evaExamenUsuarios?: EvaExamenUsuarios, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe?: 'body', reportProgress?: boolean): Observable<any>;
    public evaExamenUsuariosPatch(idexamen?: string, idusuario?: string, idrol?: string, idestado?: string, fecharegistro?: string, evaExamenUsuarios?: EvaExamenUsuarios, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public evaExamenUsuariosPatch(idexamen?: string, idusuario?: string, idrol?: string, idestado?: string, fecharegistro?: string, evaExamenUsuarios?: EvaExamenUsuarios, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public evaExamenUsuariosPatch(idexamen?: string, idusuario?: string, idrol?: string, idestado?: string, fecharegistro?: string, evaExamenUsuarios?: EvaExamenUsuarios, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe: any = 'body', reportProgress: boolean = false ): Observable<any> {








        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (idexamen !== undefined && idexamen !== null) {
            queryParameters = queryParameters.set('idexamen', <any>idexamen);
        }
        if (idusuario !== undefined && idusuario !== null) {
            queryParameters = queryParameters.set('idusuario', <any>idusuario);
        }
        if (idrol !== undefined && idrol !== null) {
            queryParameters = queryParameters.set('idrol', <any>idrol);
        }
        if (idestado !== undefined && idestado !== null) {
            queryParameters = queryParameters.set('idestado', <any>idestado);
        }
        if (fecharegistro !== undefined && fecharegistro !== null) {
            queryParameters = queryParameters.set('fecharegistro', <any>fecharegistro);
        }

        let headers = this.defaultHeaders;
        if (prefer !== undefined && prefer !== null) {
            headers = headers.set('Prefer', String(prefer));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/vnd.pgrst.object+json',
            'text/csv'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'application/vnd.pgrst.object+json',
            'text/csv'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.patch<any>(`${this.basePath}/eva_examen_usuarios`,
            evaExamenUsuarios,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param evaExamenUsuarios eva_examen_usuarios
     * @param select Filtering Columns
     * @param prefer Preference
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public evaExamenUsuariosPost(evaExamenUsuarios?: EvaExamenUsuarios, select?: string, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe?: 'body', reportProgress?: boolean): Observable<any>;
    public evaExamenUsuariosPost(evaExamenUsuarios?: EvaExamenUsuarios, select?: string, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public evaExamenUsuariosPost(evaExamenUsuarios?: EvaExamenUsuarios, select?: string, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public evaExamenUsuariosPost(evaExamenUsuarios?: EvaExamenUsuarios, select?: string, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe: any = 'body', reportProgress: boolean = false ): Observable<any> {




        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (select !== undefined && select !== null) {
            queryParameters = queryParameters.set('select', <any>select);
        }

        let headers = this.defaultHeaders;
        if (prefer !== undefined && prefer !== null) {
            headers = headers.set('Prefer', String(prefer));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/vnd.pgrst.object+json',
            'text/csv'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'application/vnd.pgrst.object+json',
            'text/csv'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/eva_examen_usuarios`,
            evaExamenUsuarios,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}