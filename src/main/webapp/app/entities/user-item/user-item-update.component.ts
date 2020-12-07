import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUserItem, UserItem } from 'app/shared/model/user-item.model';
import { UserItemService } from './user-item.service';
import { IItem } from 'app/shared/model/item.model';
import { ItemService } from 'app/entities/item/item.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = IItem | IUser;

@Component({
  selector: 'jhi-user-item-update',
  templateUrl: './user-item-update.component.html',
})
export class UserItemUpdateComponent implements OnInit {
  isSaving = false;
  items: IItem[] = [];
  users: IUser[] = [];
  lastCorrectAnswerDp: any;
  plannedReminderDp: any;

  editForm = this.fb.group({
    id: [],
    learned: [null, [Validators.required]],
    correctAnswers: [null, [Validators.required]],
    wrongAnswers: [null, [Validators.required]],
    lastCorrectAnswer: [],
    plannedReminder: [],
    item: [],
    user: [],
  });

  constructor(
    protected userItemService: UserItemService,
    protected itemService: ItemService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userItem }) => {
      this.updateForm(userItem);

      this.itemService
        .query({ filter: 'useritem-is-null' })
        .pipe(
          map((res: HttpResponse<IItem[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IItem[]) => {
          if (!userItem.item || !userItem.item.id) {
            this.items = resBody;
          } else {
            this.itemService
              .find(userItem.item.id)
              .pipe(
                map((subRes: HttpResponse<IItem>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IItem[]) => (this.items = concatRes));
          }
        });

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(userItem: IUserItem): void {
    this.editForm.patchValue({
      id: userItem.id,
      learned: userItem.learned,
      correctAnswers: userItem.correctAnswers,
      wrongAnswers: userItem.wrongAnswers,
      lastCorrectAnswer: userItem.lastCorrectAnswer,
      plannedReminder: userItem.plannedReminder,
      item: userItem.item,
      user: userItem.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userItem = this.createFromForm();
    if (userItem.id !== undefined) {
      this.subscribeToSaveResponse(this.userItemService.update(userItem));
    } else {
      this.subscribeToSaveResponse(this.userItemService.create(userItem));
    }
  }

  private createFromForm(): IUserItem {
    return {
      ...new UserItem(),
      id: this.editForm.get(['id'])!.value,
      learned: this.editForm.get(['learned'])!.value,
      correctAnswers: this.editForm.get(['correctAnswers'])!.value,
      wrongAnswers: this.editForm.get(['wrongAnswers'])!.value,
      lastCorrectAnswer: this.editForm.get(['lastCorrectAnswer'])!.value,
      plannedReminder: this.editForm.get(['plannedReminder'])!.value,
      item: this.editForm.get(['item'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserItem>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
