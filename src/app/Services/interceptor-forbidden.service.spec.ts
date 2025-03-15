import { TestBed } from '@angular/core/testing';

import { InterceptorForbiddenService } from './interceptor-forbidden.service';

describe('InterceptorForbiddenService', () => {
  let service: InterceptorForbiddenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorForbiddenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
