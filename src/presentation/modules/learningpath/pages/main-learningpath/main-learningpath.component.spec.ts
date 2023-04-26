import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLearningpathComponent } from './main-learningpath.component';

describe('MainLearningpathComponent', () => {
  let component: MainLearningpathComponent;
  let fixture: ComponentFixture<MainLearningpathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainLearningpathComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLearningpathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
