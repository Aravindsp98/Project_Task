import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http'
import { login, signUp } from '../data-type';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  isAdminLoggedIn= new BehaviorSubject<boolean>(false);
  isLoginError= new EventEmitter<boolean>(false)
  invalidUserAuth: any;

  constructor(private http:HttpClient, private router:Router) { }

  private apiUrl = 'http://127.0.0.1:8000/';

  userSignUp(user:signUp){
    this.http.post('http://127.0.0.1:8000/admin',user,{observe:'response'})
    .subscribe((result)=>{
     if(result){
       localStorage.setItem('user',JSON.stringify(result.body));
       this.router.navigate(['']);
     }
     
    })
     
   }
  // reloadSeller(){
  //   if(localStorage.getItem('admin')){
  //     this.isAdminLoggedIn.next(true)
  //     this.router.navigate(['admin-home'])
  //   }
  // }
  // userLogin(loginData: login): Observable<any> {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.post(`${this.apiUrl}admin/login/`, loginData, { headers });
  // }

  userLogin(data: login) {
    this.http.post<signUp[]>('http://127.0.0.1:8000/admin/login', data, {observe: 'response'})
      .subscribe((result) => {
        if (result && result.body?.length) {
          localStorage.setItem('admin', JSON.stringify(result.body[0]));
          this.router.navigate(['']);
          this.invalidUserAuth.emit(false);
        } else {
          this.invalidUserAuth.emit(true);
        }
      });
  }


}
