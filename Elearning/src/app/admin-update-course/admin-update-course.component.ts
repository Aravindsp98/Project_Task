import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { course } from '../data-type';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-admin-update-course',
  templateUrl: './admin-update-course.component.html',
  styleUrls: ['./admin-update-course.component.css'],
})
export class AdminUpdateCourseComponent implements OnInit {
  courseData: undefined | course;
  courseMessage: undefined | string;
  constructor(private route: ActivatedRoute, private course: CourseService) {}

  ngOnInit(): void {
    let courseId = this.route.snapshot.paramMap.get('id');
    console.warn(courseId);
    courseId &&
      this.course.getCourse(courseId).subscribe((data) => {
        console.warn(data);
        this.courseData = data;
      });
  }
  submit(data: any) {
    if (this.courseData) {
      data.id = this.courseData.id;
    }
    this.course.updateCourse(data).subscribe((result) => {
      if (result) {
        this.courseMessage = 'Course has updated';
      }
    });
    setTimeout(() => {
      this.courseMessage = undefined;
    }, 3000);
    console.warn(data);
  }
}
