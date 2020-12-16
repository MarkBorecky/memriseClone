import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICourse } from 'app/shared/model/course.model';
import { JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ItemService } from './item/item.service';

import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { IItem } from 'app/shared/model/item.model';
import { ItemDeleteDialogComponent } from './item/item-delete-dialog.component';

@Component({
  selector: 'jhi-course-detail',
  templateUrl: './course-detail.component.html',
})
export class CourseDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  course: ICourse | null = null;
  items?: IItem[];
  eventSubscriber?: Subscription;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected itemService: ItemService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ course }) => (this.course = course));
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
    this.itemService.findByCourseId(courseId).subscribe((res: HttpResponse<IItem[]>) => (this.items = res.body || []));
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IItem): number {
    return item.id!;
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

  delete(item: IItem): void {
    const modalRef = this.modalService.open(ItemDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.item = item;
  }
}
