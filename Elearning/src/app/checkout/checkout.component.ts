import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order } from '../data-type';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  total_price: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;
  constructor(private course: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.course.currentCart().subscribe((result) => {

      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.total_price = price + (price / 10) - (price / 10);

      console.warn(this.total_price);

    })

  }
  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let user_id = user && JSON.parse(user).id;
    if (this.total_price) {
      let orderData: order = {
        ...data,
        total_price: this.total_price,
        user_id,
        order_id: undefined
      }

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.course.deleteCartItems(item.id);
        }, 700)
      })

      this.course.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = "Order has been placed";
          setTimeout(() => {
            this.orderMsg = undefined;
            this.router.navigate(['/my-orders'])
          }, 4000);

        }

      })
    }

  }

}
