import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import appRoutes from './routerConfig';
import {FormsModule} from '@angular/forms';
import { PapaParseModule } from 'ngx-papaparse';


/**Material elementos */
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
/*Componentes propios**/
import { ProfesoresComponent } from './components/usuarios/profesores/profesores.component';
import { AlumnosComponent } from './components/usuarios/alumnos/alumnos.component';
import { UsersComponent } from './components/usuarios/users/users.component';


/** mis servicios**/



import { EvaAdminUsuariosService } from '../services/api/evaAdminUsuarios.service';
import { EvaCategoriasService } from '../services/api//evaCategorias.service';
import { EvaEstadosService } from '../services/api//evaEstados.service';
import { EvaExamenUsuariosService } from '../services/api//evaExamenUsuarios.service';
import { EvaExamenesService } from '../services/api//evaExamenes.service';
import { EvaLoginsService } from '../services/api//evaLogins.service';
import { EvaPreguntaAlternativasService } from '../services/api//evaPreguntaAlternativas.service';
import { EvaPreguntaConfigsService } from '../services/api//evaPreguntaConfigs.service';
import { EvaPreguntaEstructService } from '../services/api//evaPreguntaEstruct.service';
import { EvaPreguntasService } from '../services/api//evaPreguntas.service';
import { EvaResolucionesService } from '../services/api//evaResoluciones.service';
import { EvaUsuarioRolesService } from '../services/api//evaUsuarioRoles.service';
import { IntrospectionService } from '../services/api//introspection.service';

import { LoginComponent } from './components/login/login.component';




/**Login SOcial*/
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";


import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { EvaluadosComponent } from './components/examenes/evaluados/evaluados.component';
import { PreguntasComponent } from './components/examenes/preguntas/preguntas.component';
import { ExamenComponent } from './components/examenes/examen/examen.component';
import { ConfigComponent } from './components/examenes/preguntas/config/config.component';
import { ConfigComponentExamen } from './components/examenes/config/config.component';
import { VerificacionComponent } from './components/verificacion/verificacion.component';
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("705690060122-o14dpcf845ac2e095vs61n4rls5q2752.apps.googleusercontent.com")
  }
]);
 
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    UsersComponent,
    ProfesoresComponent,
    AlumnosComponent,
    LoginComponent,
    DashboardComponent,
    ExamenesComponent,
    EvaluadosComponent,
    PreguntasComponent,
    ExamenComponent,
    ConfigComponent,
    ConfigComponentExamen,
    VerificacionComponent
 
  ],
  imports: [
    
    SocialLoginModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    FormsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    
    PapaParseModule
  ],
  providers: [     
    
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
     MatDatepickerModule,
    MatNativeDateModule,
    
    EvaAdminUsuariosService,
   EvaCategoriasService,
   EvaEstadosService,
   EvaExamenUsuariosService,
   EvaExamenesService,
   EvaLoginsService,
   EvaPreguntaAlternativasService,
   EvaPreguntaConfigsService,
   EvaPreguntaEstructService,
   EvaPreguntasService,
   EvaResolucionesService,
   EvaUsuarioRolesService,
    IntrospectionService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
