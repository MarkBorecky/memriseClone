import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { CourseService } from 'app/course/course.service';
import { ICourse } from 'app/shared/model/course.model';

@Component({
  selector: 'jhi-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnChanges {
  @Input() user: IUser | undefined = undefined;
  courses: ICourse[] | null = null;
  coursesAmount: number | undefined = undefined;

  constructor(protected userService: UserService, protected courseService: CourseService) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.courseService.findByUser().subscribe((res: HttpResponse<ICourse[]>) => {
      this.courses = res.body;
      this.coursesAmount = this.courses?.length ? this.courses?.length : 0;
      // eslint-disable-next-line no-console
      console.warn('courses', this.courses);
    });
  }
}
