import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'course',
        loadChildren: () => import('app/course/course.module').then(m => m.MemriseCloneCourseModule),
      },
<<<<<<<<< Temporary merge branch 1
      {
        path: 'item',
        loadChildren: () => import('../course/item/item.module').then(m => m.MemriseCloneItemModule),
      },
      {
        path: 'user-item',
        loadChildren: () => import('./user-item/user-item.module').then(m => m.MemriseCloneUserItemModule),
      },
=========
//      {
//        path: 'item',
//      loadChildren: () => import('./item/item.module').then(m => m.MemriseCloneItemModule),
//     },
//      {
//        path: 'user-item',
//        loadChildren: () => import('./user-item/user-item.module').then(m => m.MemriseCloneUserItemModule),
//      },
>>>>>>>>> Temporary merge branch 2
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class MemriseCloneEntityModule {}
