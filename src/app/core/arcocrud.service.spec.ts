import { TestBed } from '@angular/core/testing';

import { ArcocrudService } from './arcocrud.service';

describe('ArcocrudService', () => {
  let service: ArcocrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArcocrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
