import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaritimeShipmentForm } from './maritime-shipment-form';

describe('MaritimeShipmentForm', () => {
  let component: MaritimeShipmentForm;
  let fixture: ComponentFixture<MaritimeShipmentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaritimeShipmentForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaritimeShipmentForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
