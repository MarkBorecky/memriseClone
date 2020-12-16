import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'app/entities/item/item.service';

import { ICourse } from 'app/shared/model/course.model';
import { IItem } from 'app/shared/model/item.model';

@Component({
  selector: 'jhi-course-detail',
  templateUrl: './course-detail.component.html',
})
export class CourseDetailComponent implements OnInit {
  course: ICourse | null = null;
  courseId: number | null = null;

  constructor(protected activatedRoute: ActivatedRoute, protected itemService: ItemService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ course }) => ((this.course = course), (this.courseId = course.id)));
  }

  previousState(): void {
    window.history.back();
  }
}
