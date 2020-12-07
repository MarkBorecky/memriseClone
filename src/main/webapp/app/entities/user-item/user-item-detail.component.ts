import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserItem } from 'app/shared/model/user-item.model';

@Component({
  selector: 'jhi-user-item-detail',
  templateUrl: './user-item-detail.component.html',
})
export class UserItemDetailComponent implements OnInit {
  userItem: IUserItem | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userItem }) => (this.userItem = userItem));
  }

  previousState(): void {
    window.history.back();
  }
}
