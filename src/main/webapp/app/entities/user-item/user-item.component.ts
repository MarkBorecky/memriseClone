import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserItem } from 'app/shared/model/user-item.model';
import { UserItemService } from './user-item.service';
import { UserItemDeleteDialogComponent } from './user-item-delete-dialog.component';

@Component({
  selector: 'jhi-user-item',
  templateUrl: './user-item.component.html',
})
export class UserItemComponent implements OnInit, OnDestroy {
  userItems?: IUserItem[];
  eventSubscriber?: Subscription;

  constructor(protected userItemService: UserItemService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.userItemService.query().subscribe((res: HttpResponse<IUserItem[]>) => (this.userItems = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUserItems();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserItem): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserItems(): void {
    this.eventSubscriber = this.eventManager.subscribe('userItemListModification', () => this.loadAll());
  }

  delete(userItem: IUserItem): void {
    const modalRef = this.modalService.open(UserItemDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userItem = userItem;
  }
}
