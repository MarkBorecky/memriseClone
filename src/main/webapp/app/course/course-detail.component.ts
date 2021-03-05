import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICourse } from 'app/shared/model/course.model';
import { JhiDataUtils, JhiEventManager } from 'ng-jhipster';

import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ItemDeleteDialogComponent } from './item/item-delete-dialog.component';
import { UserItemService } from 'app/entities/user-item/user-item.service';
import { IUserItem } from 'app/shared/model/user-item.model';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-course-detail',
  templateUrl: './course-detail.component.html',
})
export class CourseDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  course: ICourse | null = null;
  userItems?: IUserItem[];
  eventSubscriber?: Subscription;
  userId: number | null = null;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected userItemService: UserItemService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ course }) => (this.course = course));
    this.accountService.getAuthenticationState().subscribe(account => (this.userId = Number(account?.id)));
  }

  ngAfterViewInit(): void {
    if (this.course) {
      this.loadAll(this.course?.id);
      this.registerChangeInItems();
    }
  }

  previousState(): void {
    window.history.back();
  }
  loadAll(courseId: number | undefined): void {
    this.userItemService.findByCourseIdAll(courseId).subscribe((res: HttpResponse<IUserItem[]>) => {
      this.userItems = res.body || [];
      // eslint-disable-next-line no-console
      console.log('items', this.userItems);
    });
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  // trackId(index: number, item: IUserItem): number {
  //   return item.id!;
  // }

  isLernt(correctAnswers: number | undefined): boolean {
    if (correctAnswers === undefined || correctAnswers < 3) {
      return false;
    } else {
      return true;
    }
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInItems(): void {
    this.eventSubscriber = this.eventManager.subscribe('itemListModification', () => this.loadAll(this.course?.id));
  }

  delete(userItem: IUserItem): void {
    const modalRef = this.modalService.open(ItemDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.item = userItem.item;
  }
}
