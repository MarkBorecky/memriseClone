import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICourse, Course } from 'app/shared/model/course.model';
import { CourseService } from './course.service';
import { CourseComponent } from './course.component';
import { CourseDetailComponent } from './course-detail.component';
import { CourseUpdateComponent } from './course-update.component';
import { ItemUpdateComponent } from './item/item-update.component';
import { ItemResolve } from './item/item.route';
import { ItemDetailComponent } from './item/item-detail.component';
import { ItemService } from './item/item.service';
import { LearningComponent } from './learning/learning.component';

@Injectable({ providedIn: 'root' })
export class CourseResolve implements Resolve<ICourse> {
  constructor(private courseService: CourseService, private itemService: ItemService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICourse> | Observable<never> {
    // eslint-disable-next-line no-console
    console.log('CourseResolve');
    // eslint-disable-next-line no-console
    console.log('params', route.params);
    const id = route.params['id'];
    if (id) {
      return this.courseService.find(id).pipe(
        flatMap((course: HttpResponse<Course>) => {
          if (course.body) {
            return of(course.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Course());
  }
}

export const courseRoute: Routes = [
  {
    path: '',
    component: CourseComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Courses',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CourseDetailComponent,
    resolve: {
      course: CourseResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Courses',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CourseUpdateComponent,
    resolve: {
      course: CourseResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Courses',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    // /course/1/view/course/item/new
    path: ':id/view/course/item/new',
    component: ItemUpdateComponent,
    resolve: {
      course: CourseResolve,
      item: ItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Items',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'item/:itemId/view',
    component: ItemDetailComponent,
    resolve: {
      course: CourseResolve,
      item: ItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Items',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'item/:itemId/edit',
    component: ItemUpdateComponent,
    resolve: {
      item: ItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Items',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CourseUpdateComponent,
    resolve: {
      course: CourseResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Courses',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/learn',
    component: LearningComponent,
    resolve: {
      course: CourseResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Learn',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/item/new',
    component: ItemUpdateComponent,
    resolve: {
      item: ItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Items',
    },
    canActivate: [UserRouteAccessService],
  },
];
