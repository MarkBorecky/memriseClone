import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'course',
        loadChildren: () => import('app/course/course.module').then(m => m.MemriseCloneCourseModule),
      },
//      {
//        path: 'item',
//      loadChildren: () => import('./item/item.module').then(m => m.MemriseCloneItemModule),
//     },
//      {
//        path: 'user-item',
//        loadChildren: () => import('./user-item/user-item.module').then(m => m.MemriseCloneUserItemModule),
//      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class MemriseCloneEntityModule {}
