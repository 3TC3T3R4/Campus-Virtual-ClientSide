import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteCourseComponent } from './route-course.component';

describe('RouteCourseComponent', () => {
  let component: RouteCourseComponent;
  let fixture: ComponentFixture<RouteCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
