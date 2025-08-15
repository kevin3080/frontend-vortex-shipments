import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandShipmentForm } from './land-shipment-form';

describe('LandShipmentForm', () => {
  let component: LandShipmentForm;
  let fixture: ComponentFixture<LandShipmentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandShipmentForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandShipmentForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
