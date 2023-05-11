import { Component, OnInit } from '@angular/core';
import { cart, login, course, signUp } from '../data-type';
import { CourseService } from '../services/course.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin:boolean=true
  authError:string="";
  constructor(private user: UserService, private course:CourseService) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: signUp) {
    this.user.userSignUp(data);
  }


  login(data: login) {
    this.user.userLogin(data)
    this.localCartToRemoteCart();
  }
  openSignUp(){
    this.showLogin=false
  }
  openLogin(){
this.showLogin=true;
  }

  localCartToRemoteCart(){
   let data = localStorage.getItem('localCart');
   let user = localStorage.getItem('user');
   let user_id= user && JSON.parse(user).id;
   if(data){
    let cartDataList:course[]= JSON.parse(data);
  
    cartDataList.forEach((course:course, index)=>{
      let cartData:cart={
        ...course,
        course_id:course.id,
        user_id
      }
      delete cartData.id;
      setTimeout(() => {
        this.course.addToCart(cartData).subscribe((result)=>{
          if(result){
            console.warn("data is stored in DB");
          }
        })
      }, 500);
      if(cartDataList.length===index+1){
        localStorage.removeItem('localCart')
      }
    })
   }

   setTimeout(() => {
    this.course.getCartList(user_id)
   }, 2000);
    
  }
}
