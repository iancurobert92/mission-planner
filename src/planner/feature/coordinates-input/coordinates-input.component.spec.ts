import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatesInputComponent } from './coordinates-input.component';

describe('CoordinatesInputComponent', () => {
  let component: CoordinatesInputComponent;
  let fixture: ComponentFixture<CoordinatesInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinatesInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoordinatesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
