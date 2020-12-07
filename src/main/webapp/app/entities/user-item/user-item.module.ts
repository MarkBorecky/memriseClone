import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MemriseCloneSharedModule } from 'app/shared/shared.module';
import { UserItemComponent } from './user-item.component';
import { UserItemDetailComponent } from './user-item-detail.component';
import { UserItemUpdateComponent } from './user-item-update.component';
import { UserItemDeleteDialogComponent } from './user-item-delete-dialog.component';
import { userItemRoute } from './user-item.route';

@NgModule({
  imports: [MemriseCloneSharedModule, RouterModule.forChild(userItemRoute)],
  declarations: [UserItemComponent, UserItemDetailComponent, UserItemUpdateComponent, UserItemDeleteDialogComponent],
  entryComponents: [UserItemDeleteDialogComponent],
})
export class MemriseCloneUserItemModule {}
