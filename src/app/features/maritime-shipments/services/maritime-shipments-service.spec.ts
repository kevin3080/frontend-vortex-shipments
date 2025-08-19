import { TestBed } from '@angular/core/testing';

import { MaritimeShipmentsService } from './maritime-shipments-service';

describe('MaritimeShipmentsService', () => {
  let service: MaritimeShipmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaritimeShipmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
