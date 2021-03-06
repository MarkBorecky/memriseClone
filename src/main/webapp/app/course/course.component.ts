import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICourse } from 'app/shared/model/course.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CourseService } from './course.service';
import { CourseDeleteDialogComponent } from './course-delete-dialog.component';

import { UserService } from 'app/core/user/user.service';
import { AccountService } from 'app/core/auth/account.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'app/core/user/user.model';

@Component({
  selector: 'jhi-course',
  templateUrl: './course.component.html',
})
export class CourseComponent implements OnInit, OnDestroy {
  courses: ICourse[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;
  user: IUser | undefined = undefined;
  login: string | undefined = '';

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected accountService: AccountService,
    protected userService: UserService,
    protected courseService: CourseService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.courses = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.courseService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<ICourse[]>) => this.paginateCourses(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.courses = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCourses();
    // this.activatedRoute.data.subscribe(({ course }) => {
    this.accountService.getAuthenticationState().subscribe(account => (this.login = account?.login));
    this.userService.find(this.login ? this.login : '').subscribe(res => (this.user = res || undefined));
    // });
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICourse): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCourses(): void {
    this.eventSubscriber = this.eventManager.subscribe('courseListModification', () => this.reset());
  }

  delete(course: ICourse): void {
    const modalRef = this.modalService.open(CourseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.course = course;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateCourses(data: ICourse[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.courses.push(data[i]);
      }
    }
  }
}
