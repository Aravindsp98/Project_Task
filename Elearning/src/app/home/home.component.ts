import { Component, OnInit } from '@angular/core';
import { course } from '../data-type';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
 popularCourses:undefined|course[];
 trendyCourses:undefined | course[];
  constructor(private course:CourseService) {}

  ngOnInit(): void {
    this.course.popularCourse().subscribe((data)=>{
      this.popularCourses=data;
    })

    this.course.trendyCourse().subscribe((data)=>{
      this.trendyCourses=data;
    })
  }
}
