import { TestBed } from '@angular/core/testing';

import { BookshowsService } from './bookshows.service';

describe('BookshowsService', () => {
  let service: BookshowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookshowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
