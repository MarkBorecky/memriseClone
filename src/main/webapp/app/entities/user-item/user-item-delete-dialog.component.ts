import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserItem } from 'app/shared/model/user-item.model';
import { UserItemService } from './user-item.service';

@Component({
  templateUrl: './user-item-delete-dialog.component.html',
})
export class UserItemDeleteDialogComponent {
  userItem?: IUserItem;

  constructor(protected userItemService: UserItemService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userItemService.delete(id).subscribe(() => {
      this.eventManager.broadcast('userItemListModification');
      this.activeModal.close();
    });
  }
}
