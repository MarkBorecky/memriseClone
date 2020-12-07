import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUserItem, UserItem } from 'app/shared/model/user-item.model';
import { UserItemService } from './user-item.service';
import { UserItemComponent } from './user-item.component';
import { UserItemDetailComponent } from './user-item-detail.component';
import { UserItemUpdateComponent } from './user-item-update.component';

@Injectable({ providedIn: 'root' })
export class UserItemResolve implements Resolve<IUserItem> {
  constructor(private service: UserItemService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserItem> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((userItem: HttpResponse<UserItem>) => {
          if (userItem.body) {
            return of(userItem.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UserItem());
  }
}

export const userItemRoute: Routes = [
  {
    path: '',
    component: UserItemComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'UserItems',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserItemDetailComponent,
    resolve: {
      userItem: UserItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'UserItems',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserItemUpdateComponent,
    resolve: {
      userItem: UserItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'UserItems',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserItemUpdateComponent,
    resolve: {
      userItem: UserItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'UserItems',
    },
    canActivate: [UserRouteAccessService],
  },
];
