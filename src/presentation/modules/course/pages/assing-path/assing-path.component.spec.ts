import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingPathComponent } from './assing-path.component';

describe('AssingPathComponent', () => {
  let component: AssingPathComponent;
  let fixture: ComponentFixture<AssingPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssingPathComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssingPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
