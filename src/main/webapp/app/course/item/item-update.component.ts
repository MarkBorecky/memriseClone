import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IItem, Item } from 'app/shared/model/item.model';
import { ItemService } from './item.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/course/course.service';
import { createWriteStream } from 'fs';

@Component({
  selector: 'jhi-item-update',
  templateUrl: './item-update.component.html',
})
export class ItemUpdateComponent implements OnInit {
  isSaving = false;
  course: ICourse | null = null;
  courseId: string | undefined;

  editForm = this.fb.group({
    id: [],
    word: [null, [Validators.required]],
    translation: [null, [Validators.required]],
    exampleSentence: [],
    translationExampleSentence: [],
    image: [],
    imageContentType: [],
    audio: [],
    audioContentType: [],
    course: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected itemService: ItemService,
    protected courseService: CourseService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createItem();
  }

  // tslint:disable-next-line: typedef
  createItem() {
    this.activatedRoute.data.subscribe(({ item }) => {
      // eslint-disable-next-line no-console
      console.log('item', item);
      this.updateForm(new Item());
      this.courseId = item.course.id;
      this.courseService.find(Number(this.courseId)).subscribe((res: HttpResponse<ICourse>) => (this.course = res.body));
    });
  }

  updateForm(item: IItem): void {
    this.editForm.patchValue({
      id: item.id,
      word: item.word,
      translation: item.translation,
      exampleSentence: item.exampleSentence,
      translationExampleSentence: item.translationExampleSentence,
      image: item.image,
      imageContentType: item.imageContentType,
      audio: item.audio,
      audioContentType: item.audioContentType,
      course: this.course,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('memriseCloneApp.error', { message: err.message })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const item = this.createFromForm();
    if (item.id !== undefined) {
      this.subscribeToSaveResponse(this.itemService.update(item));
    } else {
      this.subscribeToSaveResponse(this.itemService.create(item));
    }
  }

  private createFromForm(): IItem {
    return {
      ...new Item(),
      id: this.editForm.get(['id'])!.value,
      word: this.editForm.get(['word'])!.value,
      translation: this.editForm.get(['translation'])!.value,
      exampleSentence: this.editForm.get(['exampleSentence'])!.value,
      translationExampleSentence: this.editForm.get(['translationExampleSentence'])!.value,
      imageContentType: this.editForm.get(['imageContentType'])!.value,
      image: this.editForm.get(['image'])!.value,
      audioContentType: this.editForm.get(['audioContentType'])!.value,
      audio: this.editForm.get(['audio'])!.value,
      course: this.course ? this.course : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItem>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ICourse): any {
    return item.id;
  }
}
