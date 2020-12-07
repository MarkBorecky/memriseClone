import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserItem } from 'app/shared/model/user-item.model';

type EntityResponseType = HttpResponse<IUserItem>;
type EntityArrayResponseType = HttpResponse<IUserItem[]>;

@Injectable({ providedIn: 'root' })
export class UserItemService {
  public resourceUrl = SERVER_API_URL + 'api/user-items';

  constructor(protected http: HttpClient) {}

  create(userItem: IUserItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userItem);
    return this.http
      .post<IUserItem>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(userItem: IUserItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userItem);
    return this.http
      .put<IUserItem>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUserItem>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUserItem[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(userItem: IUserItem): IUserItem {
    const copy: IUserItem = Object.assign({}, userItem, {
      lastCorrectAnswer:
        userItem.lastCorrectAnswer && userItem.lastCorrectAnswer.isValid() ? userItem.lastCorrectAnswer.format(DATE_FORMAT) : undefined,
      plannedReminder:
        userItem.plannedReminder && userItem.plannedReminder.isValid() ? userItem.plannedReminder.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.lastCorrectAnswer = res.body.lastCorrectAnswer ? moment(res.body.lastCorrectAnswer) : undefined;
      res.body.plannedReminder = res.body.plannedReminder ? moment(res.body.plannedReminder) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((userItem: IUserItem) => {
        userItem.lastCorrectAnswer = userItem.lastCorrectAnswer ? moment(userItem.lastCorrectAnswer) : undefined;
        userItem.plannedReminder = userItem.plannedReminder ? moment(userItem.plannedReminder) : undefined;
      });
    }
    return res;
  }
}
