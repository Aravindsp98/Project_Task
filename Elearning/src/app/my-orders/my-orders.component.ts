import { Component, OnInit } from '@angular/core';
import { order } from '../data-type';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orderData: order[] | undefined
  constructor(private course:CourseService) { }

  ngOnInit(): void {
    this.getOrderList()
  }
  cancelOrder(orderId:number|undefined){
    orderId && this.course.cancelOrder(orderId).subscribe((result)=>{
      if(result){
        this.getOrderList();
      }
    })
  }
  getOrderList() {
    this.course.orderList().subscribe((result) => {
      if (Array.isArray(result)) {
        this.orderData = result;
      } else {
        this.orderData = Object.values(result);
      }
    });
  }

}
