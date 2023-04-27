import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryByPathIDComponent } from './delivery-by-path-id.component';

describe('DeliveryByPathIDComponent', () => {
  let component: DeliveryByPathIDComponent;
  let fixture: ComponentFixture<DeliveryByPathIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryByPathIDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryByPathIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
