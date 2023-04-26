import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLearningpathsComponent } from './main-learningpaths.component';

describe('MainLearningpathsComponent', () => {
  let component: MainLearningpathsComponent;
  let fixture: ComponentFixture<MainLearningpathsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainLearningpathsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLearningpathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
