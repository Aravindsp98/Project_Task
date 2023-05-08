import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, course } from '../data-type';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseData:undefined | course;
  removeCart=false;
  cartData:course|undefined;
  constructor(private activeRoute:ActivatedRoute, private course:CourseService) { }

  ngOnInit(): void {
    let productId= this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.course.getProduct(productId).subscribe((result)=>{
      this.courseData= result;
      let cartData= localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:course)=>productId=== item.id.toString());
        if(items.length){
          this.removeCart=true
        }else{
          this.removeCart=false
        }
      }

      let user = localStorage.getItem('user');
      if(user){
        let userId= user && JSON.parse(user).id;
        this.course.getCartList(userId);

        this.course.cartData.subscribe((result)=>{
          let item = result.filter((item:course)=>productId?.toString()===item.courseId?.toString())
       if(item.length){
        this.cartData=item[0];
        this.removeCart=true;
       }
        })
      }
      
      
      
    })
    
  }
  

  addToCart(){
    if(this.courseData){
      if(!localStorage.getItem('user')){
        this.course.localAddToCart(this.courseData);
        this.removeCart=true
      }else{
        let user = localStorage.getItem('user');
        let userId= user && JSON.parse(user).id;
        let cartData:cart={
          ...this.courseData,
          courseId:this.courseData.id,
          userId
        }
        delete cartData.id;
        this.course.addToCart(cartData).subscribe((result)=>{
          if(result){
           this.course.getCartList(userId);
           this.removeCart=true
          }
        })        
      }
      
    } 
  }
  removeToCart(productId:number){
    if(!localStorage.getItem('user')){
this.course.removeItemFromCart(productId)
    }else{
      console.warn("cartData", this.cartData);
      
      this.cartData && this.course.removeToCart(this.cartData.id)
      .subscribe((result)=>{
        let user = localStorage.getItem('user');
        let userId= user && JSON.parse(user).id;
        this.course.getCartList(userId)
      })
    }
    this.removeCart=false
  }


}
