import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MemriseCloneTestModule } from '../../../test.module';
import { UserItemComponent } from 'app/entities/user-item/user-item.component';
import { UserItemService } from 'app/entities/user-item/user-item.service';
import { UserItem } from 'app/shared/model/user-item.model';

describe('Component Tests', () => {
  describe('UserItem Management Component', () => {
    let comp: UserItemComponent;
    let fixture: ComponentFixture<UserItemComponent>;
    let service: UserItemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MemriseCloneTestModule],
        declarations: [UserItemComponent],
      })
        .overrideTemplate(UserItemComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserItemComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserItemService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserItem(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userItems && comp.userItems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
