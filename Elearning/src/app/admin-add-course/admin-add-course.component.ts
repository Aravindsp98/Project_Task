import { Component, OnInit } from '@angular/core';
import { course } from '../data-type';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-admin-add-course',
  templateUrl: './admin-add-course.component.html',
  styleUrls: ['./admin-add-course.component.css'],
})
export class AdminAddCourseComponent implements OnInit {
  addCourseMessage: string | undefined;
  constructor(private course: CourseService) {}

  ngOnInit(): void {}

  submit(data: course) {
    this.course.addCourse(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addCourseMessage = 'Course is added successfully';
      }
    });

    setTimeout(() => {
      this.addCourseMessage=undefined
    }, 3000);
  }
}
