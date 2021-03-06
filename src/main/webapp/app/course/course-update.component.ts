import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICourse, Course } from 'app/shared/model/course.model';
import { CourseService } from './course.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-course-update',
  templateUrl: './course-update.component.html',
})
export class CourseUpdateComponent implements OnInit {
  isSaving = false;
  login: string | undefined = '';
  user: IUser | undefined = undefined;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    learningLanguage: [null, [Validators.required]],
    baseLanguage: [null, [Validators.required]],
    description: [],
    user: this.user,
  });

  constructor(
    protected courseService: CourseService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    protected accountService: AccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log('this.activatedRoute.data', this.activatedRoute.data);
    this.activatedRoute.data.subscribe(({ course }) => {
      this.updateForm(course);
      this.accountService.getAuthenticationState().subscribe(account => (this.login = account?.login));
      this.userService.find(this.login ? this.login : '').subscribe(res => (this.user = res || undefined));
    });
  }

  updateForm(course: ICourse): void {
    this.editForm.patchValue({
      id: course.id,
      name: course.name,
      learningLanguage: course.learningLanguage,
      baseLanguage: course.baseLanguage,
      description: course.description,
      user: this.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const course = this.createFromForm();
    if (course.id !== undefined) {
      this.subscribeToSaveResponse(this.courseService.update(course));
    } else {
      this.subscribeToSaveResponse(this.courseService.create(course));
    }
  }

  private createFromForm(): ICourse {
    return {
      ...new Course(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      learningLanguage: this.editForm.get(['learningLanguage'])!.value,
      baseLanguage: this.editForm.get(['baseLanguage'])!.value,
      description: this.editForm.get(['description'])!.value,
      user: this.user,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourse>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
