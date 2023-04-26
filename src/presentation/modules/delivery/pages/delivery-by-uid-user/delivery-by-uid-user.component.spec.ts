import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryByUidUserComponent } from './delivery-by-uid-user.component';

describe('DeliveryByUidUserComponent', () => {
  let component: DeliveryByUidUserComponent;
  let fixture: ComponentFixture<DeliveryByUidUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryByUidUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryByUidUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
