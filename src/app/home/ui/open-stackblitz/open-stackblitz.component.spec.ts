import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenStackblitzComponent } from './open-stackblitz.component';

describe('OpenStackblitzComponent', () => {
  let component: OpenStackblitzComponent;
  let fixture: ComponentFixture<OpenStackblitzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenStackblitzComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenStackblitzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
