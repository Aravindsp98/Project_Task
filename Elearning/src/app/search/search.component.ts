import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { course } from '../data-type';
import { CourseService } from '../services/course.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResult:undefined|course[]
  constructor(private activeRoute: ActivatedRoute, private product:CourseService) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.warn(query);
    query && this.product.searchCourse(query).subscribe((result)=>{
      this.searchResult=result;
      
    })
    

  }

}
