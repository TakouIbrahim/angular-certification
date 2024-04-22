import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigOptionComponent } from './config-option.component';

describe('ConfigOptionComponent', () => {
  let component: ConfigOptionComponent;
  let fixture: ComponentFixture<ConfigOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
