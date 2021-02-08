import { TestBed } from '@angular/core/testing';

import { ArcodbserviceService } from './arcodbservice.service';

describe('ArcodbserviceService', () => {
  let service: ArcodbserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArcodbserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});