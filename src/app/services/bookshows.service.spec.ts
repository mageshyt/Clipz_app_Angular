import { BookshowService } from 'src/app/services/bookshows.service';
import { TestBed } from '@angular/core/testing';

describe('BookshowsService', () => {
  let service: BookshowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookshowService);
  });

  it('should be created', () => {});
});
