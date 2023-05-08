import { Component, OnInit } from '@angular/core';
import { course } from '../data-type';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
 popularCourse:undefined|course[];
 trendyProducts:undefined | course[];
  constructor(private course:CourseService) {}

  ngOnInit(): void {
    this.course.popularCourses().subscribe((data)=>{
      this.popularCourse=data;
    })

    this.course.trendyCourses().subscribe((data)=>{
      this.trendyProducts=data;
    })
  }
}
