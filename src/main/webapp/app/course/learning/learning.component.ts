import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IItem } from 'app/shared/model/item.model';
import { Question } from 'app/shared/model/question.model';
import { timer } from 'rxjs';
import { ItemService } from '../item/item.service';

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

  constructor(
    protected itemService: ItemService,
    protected activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.data.subscribe(({ course }) => {
      this.itemService.findByCourseId(course.id).subscribe(res => {
        this.items = res.body || [];
        this.ngOnInit();
      })
    });
  }

  ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log('on init');
    // eslint-disable-next-line no-console
    console.log('itemService ->', this.items);
    const ansers = this.items.length >= 4 ? 4 : this.items.length;
    this.promptAnswerTable = this.getPromptAnswers(this.items, ansers);

    this.questions = [];
    if (this.items.length >= this.questionsNumber) {
      for (let i = 0; i < this.questionsNumber; i++) {
        this.questions.push(new Question('tiles', this.items[i].word, this.items[i].translation, this.promptAnswerTable))
      }
    } else {
      for (let i = 0; i < this.items.length; i++) {
        this.questions.push(new Question('tiles', this.items[i].word, this.items[i].translation, this.promptAnswerTable))
      }
    }
    // eslint-disable-next-line no-console
    console.log('this.questions', this.questions);
    this.questionAmount = this.questions.length;
    this.next();
  }

  getPromptAnswers(items: IItem[], howMany: number): string[] {
    const strings: string[] = [];
    for (let i = 0; i < howMany; i++) {
      strings.push(items[i].translation || '')
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
    } else if (this.questionAmount) {
      this.complete = true;
      this.questionType = '';
      this.question = '';
      this.result = (this.questionAmount / this.answerCounter) * 100;
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
    timer(2000).subscribe(x => {
      if (this.correctAnswer === answer) {
        this.next();
      } else if (this.questionItem) {
        this.questions.push(this.questionItem);
        this.next();
      }
    });
  }
}
