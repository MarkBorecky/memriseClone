import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MemriseCloneSharedModule } from 'app/shared/shared.module';
import { ItemDetailComponent } from './item-detail.component';
import { ItemUpdateComponent } from './item-update.component';
import { ItemDeleteDialogComponent } from './item-delete-dialog.component';
import { itemRoute } from './item.route';

@NgModule({
  imports: [MemriseCloneSharedModule, RouterModule.forChild(itemRoute)],
  declarations: [ItemDetailComponent, ItemUpdateComponent, ItemDeleteDialogComponent],
  entryComponents: [ItemDeleteDialogComponent],
})
export class MemriseCloneItemModule {}
