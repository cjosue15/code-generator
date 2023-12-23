import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreCodeComponent } from './pre-code.component';

describe('PreCodeComponent', () => {
  let component: PreCodeComponent;
  let fixture: ComponentFixture<PreCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
