import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechToDoComponent } from './speech-to-do.component';

describe('SpeechToDoComponent', () => {
  let component: SpeechToDoComponent;
  let fixture: ComponentFixture<SpeechToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpeechToDoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
