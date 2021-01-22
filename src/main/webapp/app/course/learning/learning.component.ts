import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'jhi-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['learning.scss'],
})
export class LearningComponent implements OnInit, OnDestroy {
  val: string | null = null;
  res: string | null = null;

  public next(): void {
    this.val = this.res;
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
