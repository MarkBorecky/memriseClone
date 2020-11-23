import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'course',
        loadChildren: () => import('./course/course.module').then(m => m.MemriseCloneCourseModule),
      },
      {
        path: 'tag',
        loadChildren: () => import('./tag/tag.module').then(m => m.MemriseCloneTagModule),
      },
      {
        path: 'item',
        loadChildren: () => import('./item/item.module').then(m => m.MemriseCloneItemModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class MemriseCloneEntityModule {}
