import { Component, OnInit } from '@angular/core';
import { course } from '../data-type';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css'],
})
export class AdminAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  constructor(private course: CourseService) {}

  ngOnInit(): void {}

  submit(data: course) {
    this.course.addProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addProductMessage = 'Product is added successfully';
      }
    });

    setTimeout(() => {
      this.addProductMessage=undefined
    }, 3000);
  }
}
