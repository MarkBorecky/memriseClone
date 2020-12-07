import { IUser } from 'app/core/user/user.model';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface ICourse {
  id?: number;
  name?: string;
  learningLanguage?: Language;
  baseLanguage?: Language;
  description?: string;
  user?: IUser;
}

export class Course implements ICourse {
  constructor(
    public id?: number,
    public name?: string,
    public learningLanguage?: Language,
    public baseLanguage?: Language,
    public description?: string,
    public user?: IUser
  ) {}
}
