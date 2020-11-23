import { ICourse } from 'app/shared/model/course.model';

export interface ITag {
  id?: string;
  lang?: string;
  course?: ICourse;
}

export class Tag implements ITag {
  constructor(public id?: string, public lang?: string, public course?: ICourse) {}
}
