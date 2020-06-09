import { Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { VerificacionComponent } from './components/verificacion/verificacion.component';




const appRoutes: Routes = [
  { path: 'admin', component: DashboardComponent,
    children:[
      {path: '', component: UsuariosComponent},
      {path: 'examenes', component: ExamenesComponent},
      {path: 'verificar', component: VerificacionComponent}
    ] 
  },
  { path: '',   component: LoginComponent  },
  { path: 'login',   component: LoginComponent  },
   // otherwise redirect to home
  { path: '**', redirectTo: '/admin' }
  
];
export default appRoutes;