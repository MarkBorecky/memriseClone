import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'course',
        loadChildren: () => import('app/course/course.module').then(m => m.MemriseCloneCourseModule),
      },
    ]),
  ],
})
export class MemriseCloneEntityModule {}
