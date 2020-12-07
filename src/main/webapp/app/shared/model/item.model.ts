import { ICourse } from 'app/shared/model/course.model';

export interface IItem {
  id?: number;
  word?: string;
  translation?: string;
  exampleSentence?: string;
  translationExampleSentence?: string;
  imageContentType?: string;
  image?: any;
  audioContentType?: string;
  audio?: any;
  course?: ICourse;
}

export class Item implements IItem {
  constructor(
    public id?: number,
    public word?: string,
    public translation?: string,
    public exampleSentence?: string,
    public translationExampleSentence?: string,
    public imageContentType?: string,
    public image?: any,
    public audioContentType?: string,
    public audio?: any,
    public course?: ICourse
  ) {}
}
