export interface IQuestion {
  type?: string;
  question?: string;
  correctAnswer?: string;
  prompts?: string[];
}

export class Question implements IQuestion {
  constructor(public type?: string, public question?: string, public correctAnswer?: string, public prompts?: string[]) {}
}
