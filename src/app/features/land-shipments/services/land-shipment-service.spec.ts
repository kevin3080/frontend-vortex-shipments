import { TestBed } from '@angular/core/testing';

import { LandShipmentService } from './land-shipment-service';

describe('LandShipmentService', () => {
  let service: LandShipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandShipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
