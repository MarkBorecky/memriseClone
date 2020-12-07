import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { UserItemService } from 'app/entities/user-item/user-item.service';
import { IUserItem, UserItem } from 'app/shared/model/user-item.model';

describe('Service Tests', () => {
  describe('UserItem Service', () => {
    let injector: TestBed;
    let service: UserItemService;
    let httpMock: HttpTestingController;
    let elemDefault: IUserItem;
    let expectedResult: IUserItem | IUserItem[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(UserItemService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new UserItem(0, false, 0, 0, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            lastCorrectAnswer: currentDate.format(DATE_FORMAT),
            plannedReminder: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a UserItem', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            lastCorrectAnswer: currentDate.format(DATE_FORMAT),
            plannedReminder: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lastCorrectAnswer: currentDate,
            plannedReminder: currentDate,
          },
          returnedFromService
        );

        service.create(new UserItem()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a UserItem', () => {
        const returnedFromService = Object.assign(
          {
            learned: true,
            correctAnswers: 1,
            wrongAnswers: 1,
            lastCorrectAnswer: currentDate.format(DATE_FORMAT),
            plannedReminder: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lastCorrectAnswer: currentDate,
            plannedReminder: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of UserItem', () => {
        const returnedFromService = Object.assign(
          {
            learned: true,
            correctAnswers: 1,
            wrongAnswers: 1,
            lastCorrectAnswer: currentDate.format(DATE_FORMAT),
            plannedReminder: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lastCorrectAnswer: currentDate,
            plannedReminder: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a UserItem', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
