import { IUser } from 'app/core/user/user.model';

export interface ICourse {
  id?: string;
  name?: string;
  description?: string;
  user?: IUser;
}

export class Course implements ICourse {
  constructor(public id?: string, public name?: string, public description?: string, public user?: IUser) {}
}
