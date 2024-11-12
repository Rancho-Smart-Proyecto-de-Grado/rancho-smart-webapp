import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCrucesComponent } from './crear-cruces.component';

describe('CrearCrucesComponent', () => {
  let component: CrearCrucesComponent;
  let fixture: ComponentFixture<CrearCrucesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearCrucesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCrucesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
