import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MemriseCloneSharedModule } from 'app/shared/shared.module';
import { CourseComponent } from './course.component';
import { CourseDetailComponent } from './course-detail.component';
import { CourseUpdateComponent } from './course-update.component';
import { CourseDeleteDialogComponent } from './course-delete-dialog.component';
import { courseRoute } from './course.route';
import { itemRoute } from './item/item.route';

@NgModule({
  imports: [MemriseCloneSharedModule, RouterModule.forChild(courseRoute), RouterModule.forChild(itemRoute)],
  declarations: [CourseComponent, CourseDetailComponent, CourseUpdateComponent, CourseDeleteDialogComponent],
  entryComponents: [CourseDeleteDialogComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MemriseCloneCourseModule {}
