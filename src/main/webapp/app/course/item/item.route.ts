import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IItem, Item } from 'app/shared/model/item.model';
import { ItemService } from './item.service';
import { ItemDetailComponent } from './item-detail.component';
import { ItemUpdateComponent } from './item-update.component';

@Injectable({ providedIn: 'root' })
export class ItemResolve implements Resolve<IItem> {
  constructor(private service: ItemService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IItem> | Observable<never> {
    // eslint-disable-next-line no-console
    console.log('ItemResolve');
    // eslint-disable-next-line no-console
    console.log('route.params', route.params);
    const itemId = route.params['itemId'];
    if (itemId) {
      return this.service.find(itemId).pipe(
        flatMap((item: HttpResponse<Item>) => {
          if (item.body) {
            return of(item.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Item());
  }
}

export const itemRoute: Routes = [
  {
    path: ':itemId/view',
    component: ItemDetailComponent,
    resolve: {
      item: ItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Items',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ItemUpdateComponent,
    resolve: {
      item: ItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Items',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    // /course/1/view/course/item/new
    path: ':itemId/view/course/item/new',
    component: ItemUpdateComponent,
    resolve: {
      course: ItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Courses',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':itemId/edit',
    component: ItemUpdateComponent,
    resolve: {
      item: ItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Items',
    },
    canActivate: [UserRouteAccessService],
  },
];
