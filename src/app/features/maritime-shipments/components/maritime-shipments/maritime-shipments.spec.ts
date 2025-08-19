import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaritimeShipments } from './maritime-shipments';

describe('MaritimeShipments', () => {
  let component: MaritimeShipments;
  let fixture: ComponentFixture<MaritimeShipments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaritimeShipments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaritimeShipments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
