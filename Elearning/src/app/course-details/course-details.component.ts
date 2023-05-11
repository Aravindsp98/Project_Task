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
  courseQuantity:number=1;
  removeCart=false;
  cartData:course|undefined;
  constructor(private activeRoute:ActivatedRoute, private course:CourseService) { }

  ngOnInit(): void {
    let courseId= this.activeRoute.snapshot.paramMap.get('courseId');
    console.warn(courseId);
    courseId && this.course.getCourse(courseId).subscribe((result)=>{
      this.courseData= result;
      let cartData= localStorage.getItem('localCart');
      if(courseId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:course)=>courseId=== item.id.toString());
        if(items.length){
          this.removeCart=true
        }else{
          this.removeCart=false
        }
      }

      let user = localStorage.getItem('user');
      if(user){
        let user_id= user && JSON.parse(user).id;
        this.course.getCartList(user_id);

        this.course.cartData.subscribe((result)=>{
          let item = result.filter((item:course)=>courseId?.toString()===item.course_id?.toString())
       if(item.length){
        this.cartData=item[0];
        this.removeCart=true;
       }
        })
      }
      
      
      
    })
    
  }
  handleQuantity(val:string){
    if(this.courseQuantity<20 && val==='plus'){
      this.courseQuantity+=1;
    }else if(this.courseQuantity>1 && val==='min'){
      this.courseQuantity-=1;
    }
  }

  addToCart(){
    if(this.courseData){
      this.courseData.quantity = this.courseQuantity;
      if(!localStorage.getItem('user')){
        this.course.localAddToCart(this.courseData);
        this.removeCart=true
      }else{
        let user = localStorage.getItem('user');
        let user_id= user && JSON.parse(user).id;
        let cartData:cart={
          ...this.courseData,
          course_id:this.courseData.id,
          user_id
        }
        delete cartData.id;
        this.course.addToCart(cartData).subscribe((result)=>{
          if(result){
           this.course.getCartList(user_id);
           this.removeCart=true
          }
        })        
      }
      
    } 
  }
  removeToCart(courseId:number){
    if(!localStorage.getItem('user')){
this.course.removeItemFromCart(courseId)
    }else{
      console.warn("cartData", this.cartData);
      
      this.cartData && this.course.removeToCart(this.cartData.id)
      .subscribe((result)=>{
        let user = localStorage.getItem('user');
        let user_id= user && JSON.parse(user).id;
        this.course.getCartList(user_id)
      })
    }
    this.removeCart=false
  }


}
