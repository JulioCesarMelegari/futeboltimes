import { TestBed } from '@angular/core/testing';

import { TimesserviceService } from './timesservice.service';

describe('TimesserviceService', () => {
  let service: TimesserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
