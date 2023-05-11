import { Component, OnInit } from '@angular/core';
import { course } from '../data-type';
import { CourseService } from '../services/course.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  courseList: undefined | course[];
  courseMessage: undefined | string;
  icon = faTrash;
  iconEdit=faEdit;
  constructor(private course: CourseService) {}

  ngOnInit(): void {
    this.list();
  }

  deleteCourse(id: number) {
    this.course.deleteCourse(id).subscribe((result) => {
      if (result) {
        this.courseMessage = 'Course is deleted';

        this.list();
      }
    });
    setTimeout(() => {
      this.courseMessage = undefined;
    }, 3000);
  }

  list() {
    this.course.courseList().subscribe((result) => {
      if (result) {
        this.courseList = result;
      }
    });
  }
}
