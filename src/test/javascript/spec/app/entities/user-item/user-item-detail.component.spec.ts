import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MemriseCloneTestModule } from '../../../test.module';
import { UserItemDetailComponent } from 'app/entities/user-item/user-item-detail.component';
import { UserItem } from 'app/shared/model/user-item.model';

describe('Component Tests', () => {
  describe('UserItem Management Detail Component', () => {
    let comp: UserItemDetailComponent;
    let fixture: ComponentFixture<UserItemDetailComponent>;
    const route = ({ data: of({ userItem: new UserItem(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MemriseCloneTestModule],
        declarations: [UserItemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UserItemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserItemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load userItem on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userItem).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
