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


export interface EvaResoluciones { 
    /**
     * Note: This is a Primary Key.<pk/>
     */
    idresolucion?: number;
    idusuario?: string;
    /**
     * Note: This is a Foreign Key to `eva_preguntas.idpregunta`.<fk table='eva_preguntas' column='idpregunta'/>
     */
    idpregunta?: number;
    /**
     * Note: This is a Foreign Key to `eva_pregunta_alternativas.idalternativa`.<fk table='eva_pregunta_alternativas' column='idalternativa'/>
     */
    idalternativa?: number;
    fecharegistro?: string;
}
