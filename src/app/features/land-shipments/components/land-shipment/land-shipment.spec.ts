import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandShipment } from './land-shipment';

describe('LandShipment', () => {
  let component: LandShipment;
  let fixture: ComponentFixture<LandShipment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandShipment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandShipment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
