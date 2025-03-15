import { TestBed } from '@angular/core/testing';

import { GValsService } from './g-vals.service';

describe('GValsService', () => {
  let service: GValsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GValsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
