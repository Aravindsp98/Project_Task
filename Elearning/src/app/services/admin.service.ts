import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  isSellerLoggedIn= new BehaviorSubject<boolean>(false);
  isLoginError= new EventEmitter<boolean>(false)

  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(data:signUp){
    this.http.post('http://127.0.0.1:8000/admin/',
    data,
    {observe:'response'}).subscribe((result)=>{
      console.warn(result)
      if(result){
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['admin-home'])
      }
    })
  } 
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }


  // userLogin(data: login) {
  //   this.http.post<signUp[]>('http://127.0.0.1:8000/users/login/', data, { observe: 'response' })
  //     .subscribe((result) => {
  //       console.warn(result)
  //       if (result) {
  //         localStorage.setItem('user', JSON.stringify(result.body));
  //         this.router.navigate(['/']);
  //       }
  //     })
  // }

  userLogin(data:login){
    this.http.post<signUp[]>('http://127.0.0.1:8000/admin/login/', data, { observe: 'response' })
    .subscribe((result) => {
    console.warn(result)
    if(result){
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['admin-home'])
    }
   })
  }
}
