import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { login, signUp } from '../data-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
invalidUserAuth= new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router:Router) { }


  private apiURL = 'http://127.0.0.1:8000/';

  userSignUp(user:signUp){
    this.http.post('http://127.0.0.1:8000/users',user,{observe:'response'})
    .subscribe((result)=>{
     if(result){
       localStorage.setItem('user',JSON.stringify(result.body));
       this.router.navigate(['']);
     }
     
    })
     
   }
   userLogin(data: login) {
    this.http.post<signUp[]>('http://127.0.0.1:8000/users/login', data, {observe: 'response'})
      .subscribe((result) => {
        if (result && result.body?.length) {
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['']);
          this.invalidUserAuth.emit(false);
        } else {
          this.invalidUserAuth.emit(true);
        }
      });
  }

  // userSignUp(user: signUp): Observable<any> {
  //   console.warn(user)
  //   return this.http.post(`${this.apiURL}/users`, user);
  // }

  // userLogin(user: login): Observable<any> {
  //   return this.http.post(`${this.apiURL}users/login/`, user);
  // }
  
  // userSignUp(user:signUp){
  //  this.http.post('http://127.0.0.1:8000/users',user,{observe:'response'})
  //  .subscribe((result)=>{
  //   if(result){
  //     localStorage.setItem('user',JSON.stringify(result.body));
  //     this.router.navigate(['']);
  //   }
    
  //  })
    
  // }
  // userLogin(data: login) {
  //   this.http.post('http://127.0.0.1:8000/users/login/', data).subscribe(
  //     (result: any) => {
  //       localStorage.setItem('token', result.token);
  //       localStorage.setItem('user', JSON.stringify(result.user));
  //       this.router.navigate(['']);
  //       this.invalidUserAuth.emit(false);
  //     },
  //     (error: any) => {
  //       console.error(error);
  //       this.invalidUserAuth.emit(true);
  //     }
  //   );
  // }
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['']);
    }
}
}