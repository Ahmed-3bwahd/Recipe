import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData{
  idToken: string;
  email:	string;
  refreshToken:	string;
  expiresIn	:string;
  localId	:string;
  registered? : boolean
}

@Injectable({providedIn: 'root'})

export class AuthserviceService {
  user = new BehaviorSubject<User>(null);
  private Timer : any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, pass: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBuh-X7VoHkVu9qZGOwquFBPfH_FMOypFI',
    {
      email: email,
      password: pass,
      returnSecureToken: true
    }).pipe(catchError(this.handelError), tap(
      resData => {this.handleAuth(
        resData.email, resData.localId, resData.idToken, +resData.expiresIn
        )}
    ));
  }

  login(email: string, pass: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBuh-X7VoHkVu9qZGOwquFBPfH_FMOypFI',
    {
      email: email,
      password: pass,
      returnSecureToken: true
    }).pipe(catchError(this.handelError), tap(
      resData => {this.handleAuth(
        resData.email, resData.localId, resData.idToken, +resData.expiresIn
        )}
    ));
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData')
    if(this.Timer) { clearTimeout(this.Timer) }
    this.Timer = null;
  }

  autoLogout(expDuration: number){
    console.log(expDuration);
    this.Timer = setTimeout(() => {
      this.logout();
    }, expDuration)
  }

  autoLogin(){
    const userData: {email:string, id: string, _token: string, _tokenExpData: string} = JSON.parse(localStorage.getItem('userData'));
    if(!userData){return;}
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date (userData._tokenExpData)
    );
    if(loadedUser.token){
      this.user.next(loadedUser);
      const expduration = new Date(userData._tokenExpData).getTime() - new Date().getTime();
      this.autoLogout(expduration);
    }
  }

  private handleAuth(email: string, userid: string, token: string, expDate: number){
    const expdate = new Date( new Date().getTime() + expDate * 1000);
    const userdata = new User(email, userid, token, expdate);
    this.user.next(userdata);
    this.autoLogout(expDate * 1000);
    localStorage.setItem('userData', JSON.stringify(userdata));
  }

  private handelError(reserror: HttpErrorResponse){
    let errormessage= "An Unknown Error occurred!";
    if(!reserror.error || !reserror.error.error){
      return throwError(errormessage);
    }
    switch(reserror.error.error.message){
      case 'EMAIL_NOT_FOUND':
        errormessage = " There is no user record corresponding to this identifier ";
        break;
      case 'INVALID_PASSWORD':
        errormessage = " The password is invalid ";
        break;
      case 'EMAIL_EXISTS':
        errormessage = " The email address is already in use by another account ";
        break;
    }
    return throwError(errormessage);
  }
}
