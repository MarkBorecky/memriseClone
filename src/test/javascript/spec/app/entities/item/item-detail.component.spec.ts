import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { MemriseCloneTestModule } from '../../../test.module';
import { ItemDetailComponent } from 'app/entities/item/item-detail.component';
import { Item } from 'app/shared/model/item.model';

describe('Component Tests', () => {
  describe('Item Management Detail Component', () => {
    let comp: ItemDetailComponent;
    let fixture: ComponentFixture<ItemDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ item: new Item('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MemriseCloneTestModule],
        declarations: [ItemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ItemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load item on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.item).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
