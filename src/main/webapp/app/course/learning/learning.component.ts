import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserItemService } from 'app/entities/user-item/user-item.service';
import { IItem } from 'app/shared/model/item.model';
import { Question } from 'app/shared/model/question.model';
import { IUserItem } from 'app/shared/model/user-item.model';
import { timer } from 'rxjs';

@Component({
  selector: 'jhi-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['learning.scss'],
})
export class LearningComponent implements OnInit {
  question: string | undefined = undefined;
  answer = 'odp';
  questionType: string | undefined = undefined;
  tiles: string[] | undefined = undefined;
  correctAnswer: string | undefined = undefined;
  showAnswer = false;
  selected = '';
  questions: Question[] = [];
  items: IItem[] = [];
  iUserItems: IUserItem[] = [];
  questionsNumber = 5;
  questionItem: Question | undefined = undefined;
  questionAmount: number | undefined = undefined;
  correctAnswerAmount = 0;
  progress = 0;
  answerCounter = 0;
  result = 0;
  complete = false;
  promptAnswerTable: string[] | undefined = undefined;
  courseId: number | undefined = undefined;
  userId: number | undefined = undefined;

  constructor(protected userItemService: UserItemService, protected activatedRoute: ActivatedRoute, protected router: Router) {
    this.activatedRoute.data.subscribe(({ course }) => {
      this.courseId = course.id;
      this.userItemService.findByCourseId(course.id).subscribe(res => {
        this.iUserItems = res.body || [];
        this.ngOnInit();
      });
    });
  }

  ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log('on init');
    // eslint-disable-next-line no-console
    console.log('itemService ->', this.iUserItems);
    this.iUserItems = this.iUserItems.filter(item => item.learned === false);
    // eslint-disable-next-line no-console
    console.log('after filter ->', this.iUserItems);
    const ansers = this.iUserItems.length >= 4 ? 4 : this.iUserItems.length;
    this.promptAnswerTable = this.getPromptAnswers(this.iUserItems, ansers);

    this.questions = [];
    if (this.iUserItems.length >= this.questionsNumber) {
      for (let i = 0; i < this.questionsNumber; i++) {
        const word = this.iUserItems[i]?.item?.word;
        const translation = this.iUserItems[i]?.item?.translation || '';
        const prompts = this.promptAnswerTable;
        this.questions.push(new Question('tiles', word, translation, prompts));
      }
    } else {
      for (let i = 0; i < this.iUserItems.length; i++) {
        const word = this.iUserItems[i].item?.word;
        const translation = this.iUserItems[i].item?.translation || '';
        const prompts = this.promptAnswerTable;
        this.questions.push(new Question('tiles', word, translation, prompts));
      }
    }

    this.questionAmount = this.questions.length;
    this.next();
  }

  getPromptAnswers(iUserItems: IUserItem[], howMany: number): string[] {
    const strings: string[] = [];
    for (let i = 0; i < howMany; i++) {
      strings.push(iUserItems[i].item?.translation || '');
    }
    return strings;
  }

  public next(): void {
    if (this.questions.length > 0) {
      this.questionItem = this.questions.shift();
      this.showAnswer = false;
      this.questionType = this.questionItem?.type;
      this.question = this.questionItem?.question;
      this.correctAnswer = this.questionItem?.correctAnswer;
      this.tiles = this.questionItem?.prompts;
      if (!this.questionItem?.prompts?.includes(this.questionItem?.correctAnswer || '')) {
        this.questionItem?.prompts?.pop();
        this.questionItem?.prompts?.push(this.questionItem?.correctAnswer || '');
        this.questionItem?.prompts?.reverse();
      }
      // eslint-disable-next-line no-console
      console.log('this.questions', this.questions);
    } else if (this.questionAmount) {
      this.complete = true;
      this.questionType = '';
      this.question = '';
      this.result = (this.questionAmount / this.answerCounter) * 100;
      timer(2000).subscribe(() => {
        this.router.navigate(['course', this.courseId, 'view']);
      });
    }
  }

  chooseAnwser(answer: string): void {
    this.answerCounter++;
    this.selected = answer;
    this.showAnswer = true;
    if (this.correctAnswer === answer && this.questionAmount) {
      this.correctAnswerAmount++;
      this.progress = (this.correctAnswerAmount / this.questionAmount) * 100;
    }
    const iuitem = this.findIUserItem(this.questionItem);

    timer(2000).subscribe(x => {
      if (this.correctAnswer === answer) {
        const correctAnswers = iuitem?.correctAnswers ? iuitem?.correctAnswers + 1 : 1;
        iuitem.correctAnswers = correctAnswers;
        if (correctAnswers >= 3) {
          iuitem.learned = true;
        }
        this.next();
      } else if (this.questionItem) {
        const wrongAnswers = iuitem?.wrongAnswers ? iuitem?.wrongAnswers + 1 : 1;
        iuitem.wrongAnswers = wrongAnswers;
        this.questions.push(this.questionItem);
        this.next();
      }
      // eslint-disable-next-line no-console
      console.log('update', iuitem);
      this.userItemService.update(iuitem).subscribe(res => {
        // eslint-disable-next-line no-console
        console.log('res', res);
      });
    });
  }

  findIUserItem(questionItem: Question | undefined): IUserItem {
    return this.iUserItems.filter(iui => iui?.item?.word === questionItem?.question)[0];
  }
}
