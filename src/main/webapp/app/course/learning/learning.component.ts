import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from 'app/shared/model/question.model';
import { timer } from 'rxjs';

@Component({
  selector: 'jhi-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['learning.scss'],
})
export class LearningComponent implements OnInit, OnDestroy {
  question: string | undefined = undefined;
  answer = 'odp';
  questionType: string | undefined = undefined;
  tiles: string[] | undefined = undefined;
  correctAnswer: string | undefined = undefined;
  showAnswer = false;
  selected = '';
  questions: Question[] = [];
  questionItem: Question | undefined = undefined;
  questionAmount: number | undefined = undefined;
  correctAnswerAmount = 0;
  progress = 0;
  answerCounter = 0;
  result = 0;
  complete = false;

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

  ngOnInit(): void {
    this.questions.push(new Question('tiles', 'pies', 'dog', ['cat', 'parrot', 'dog', 'giraffe']));
    this.questions.push(new Question('tiles', 'kot', 'cat', ['parrot', 'dog', 'giraffe', 'cat']));
    this.questions.push(new Question('tiles', 'kura', 'hen', ['cat', 'parrot', 'dog', 'hen']));
    this.questions.push(new Question('tiles', 'krokodyl', 'crocodile', ['cat', 'crocodile', 'dog', 'giraffe']));
    this.questionAmount = this.questions.length;
    this.next();
  }

  ngOnDestroy(): void {}

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
