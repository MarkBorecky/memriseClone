import { Moment } from 'moment';
import { IItem } from 'app/shared/model/item.model';
import { IUser } from 'app/core/user/user.model';

export interface IUserItem {
  id?: number;
  learned?: boolean;
  correctAnswers?: number;
  wrongAnswers?: number;
  lastCorrectAnswer?: Moment;
  plannedReminder?: Moment;
  item?: IItem;
  user?: IUser;
}

export class UserItem implements IUserItem {
  constructor(
    public id?: number,
    public learned?: boolean,
    public correctAnswers?: number,
    public wrongAnswers?: number,
    public lastCorrectAnswer?: Moment,
    public plannedReminder?: Moment,
    public item?: IItem,
    public user?: IUser
  ) {
    this.learned = this.learned || false;
  }
}
