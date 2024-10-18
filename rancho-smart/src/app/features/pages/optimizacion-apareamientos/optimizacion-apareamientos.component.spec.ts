import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimizacionApareamientosComponent } from './optimizacion-apareamientos.component';

describe('OptimizacionApareamientosComponent', () => {
  let component: OptimizacionApareamientosComponent;
  let fixture: ComponentFixture<OptimizacionApareamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptimizacionApareamientosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptimizacionApareamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
