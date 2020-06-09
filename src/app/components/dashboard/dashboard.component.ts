import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService,
    protected router:Router) { }

  ngOnInit(): void {
    this.cargarUsuario();

  }

  cargarUsuario(){
    this.authService.authState.subscribe((user) => {
      if(user == null){
        this.router.navigate(['/login'])
      }else{
      this.user = user;
      this.loggedIn = (user != null);
    }
  
    });
  }


  
}
