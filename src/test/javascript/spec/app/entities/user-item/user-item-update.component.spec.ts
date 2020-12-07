import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MemriseCloneTestModule } from '../../../test.module';
import { UserItemUpdateComponent } from 'app/entities/user-item/user-item-update.component';
import { UserItemService } from 'app/entities/user-item/user-item.service';
import { UserItem } from 'app/shared/model/user-item.model';

describe('Component Tests', () => {
  describe('UserItem Management Update Component', () => {
    let comp: UserItemUpdateComponent;
    let fixture: ComponentFixture<UserItemUpdateComponent>;
    let service: UserItemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MemriseCloneTestModule],
        declarations: [UserItemUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(UserItemUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserItemUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserItemService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserItem(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserItem();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
