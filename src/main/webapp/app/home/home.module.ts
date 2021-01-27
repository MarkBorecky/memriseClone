import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MemriseCloneSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  imports: [MemriseCloneSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent, UserDetailComponent],
})
export class MemriseCloneHomeModule {}
