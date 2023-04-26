import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRegistrationsComponent } from './main-registrations.component';

describe('MainRegistrationsComponent', () => {
  let component: MainRegistrationsComponent;
  let fixture: ComponentFixture<MainRegistrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainRegistrationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
