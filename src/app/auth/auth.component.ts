import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthserviceService, AuthResponseData } from './authservice.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  loginmode = true;
  loading = false;
  error : string = null;

  constructor(private authser: AuthserviceService, private router: Router) { }

  onSwetchMode(){ this.loginmode = !this.loginmode}

  onsubmit(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    let authobs: Observable<AuthResponseData>;
    this.loading = true;

    if( !form.valid ){ return; }

    if(this.loginmode){
      authobs = this.authser.login(email, password)
    }else{
      authobs = this.authser.signup(email, password)
    }
    authobs.subscribe(
      resdata => {
        console.log(resdata);
        this.loading = false;
        this.router.navigate(['/recipes']);
      },
      errormessage => {
        console.log(errormessage);
        this.error = errormessage;
        this.loading = false;
      } );
    form.reset()
  }

  onClsErr(){ this.error = null}

}
