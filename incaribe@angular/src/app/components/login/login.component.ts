import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {User}from 'app/models/user';
import {UserService} from 'app/services/user.service';
import {GLOBAL} from 'app/services/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public user: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;
  public url;
  constructor(
  private _route: ActivatedRoute,
  private _router: Router,
  private _userService:UserService
  ) {
    this.user = new User('','','','','','ROLE_USER','');
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    console.log(this.identity);
    console.log(this.token);
    if(this.identity){
      this._router.navigate(['/projects']);
    }
  }

  goToProject(){
    this._router.navigate(['/projects']);
  }
  public onSubmit(){

    console.log(this.user);

    //Conseguir los datos del usuario identificado
    this._userService.signup(this.user).subscribe(
      response =>{
        let identity = response.user;
        this.identity = identity;

        if(!this.identity._id){
          alert("El usuario no esta correctamente identificado"); 
        }else{
          // Crear elemento en el localstorage para tener al usuario en sesión
          localStorage.setItem('identity', JSON.stringify(identity));

          //Conseguir el token para enviarselo a cada peticion http

            this._userService.signup(this.user, 'true').subscribe(
            response =>{
              let token = response.token;
              this.token = token;

              if(this.token.length <= 0){
                alert('El token no se ha generado correctamente');
              }else{
                // Crear elemento en el localstorage para tener el token disponible
                //Conseguir el token para enviarselo a cada peticion

                localStorage.setItem('token', token);
                this.user = new User('','','','','','ROLE_USER','');
                this.goToProject();
              }
            },

            error =>{
              var errorMessage = <any>error;

              if(errorMessage!=null){
                var body = JSON.parse(error._body);
                this.errorMessage =body.message;
                console.log(error);
              }
            }

          );
        }
      },

      error =>{
        var errorMessage = <any>error;

        if(errorMessage!=null){
          var body = JSON.parse(error._body);
          this.errorMessage =body.message;
          console.log(error);
        }
      }

    );
  }
}
