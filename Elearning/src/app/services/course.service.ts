import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, course } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  cartData = new EventEmitter<course[] | []>();
  constructor(private http: HttpClient) { }
  addCourse(data: course) {
    return this.http.post('http://127.0.0.1:8000/courses/', data);
  }
  courseList() {
    return this.http.get<course[]>('http://127.0.0.1:8000/courses/');
  }

  deleteCourse(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/courses/${id}/`);
  }

  getCourse(id: string) {
    return this.http.get<course>(`http://127.0.0.1:8000/courses/${id}/`);
  }

  updateCourse(course: course) {
    return this.http.put<course>(
      `http://127.0.0.1:8000/courses/${course.id}/`,
      course
    );
  }
  popularCourse() {
    return this.http.get<course[]>('http://127.0.0.1:8000/courses/?_limit=3');
  }

  trendyCourse() {
    return this.http.get<course[]>('http://127.0.0.1:8000/courses/?_limit=8');
  }

  searchCourse(query: string) {
    return this.http.get<course[]>(
      `http://127.0.0.1:8000/courses/?q=${query}`
    );
  }

  localAddToCart(data: course) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(courseId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: course[] = JSON.parse(cartData);
      items = items.filter((item: course) => courseId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post('http://127.0.0.1:8000/cart/', cartData);
  }
  getCartList(user_id: number) {
    return this.http
      .get<course[]>('http://127.0.0.1:8000/cart/?user_id=/' + user_id, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
  removeToCart(cartId: number) {
    return this.http.delete('http://127.0.0.1:8000/cart/' + cartId + '/');
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://127.0.0.1:8000/cart/?user_id=' + userData.id);
  }

  orderNow(data: order) {
    return this.http.post('http://127.0.0.1:8000/orders/', data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://127.0.0.1:8000/orders/' + userData.id +'/');
  }

  deleteCartItems(cartId: number) {
    return this.http.delete('http://127.0.0.1:8000/cart/' + cartId + '/').subscribe((result) => {
      this.cartData.emit([]);
    })
  }

  cancelOrder(order_id:number){
    return this.http.delete('http://127.0.0.1:8000/orders/'+order_id+'/')

  }

}
