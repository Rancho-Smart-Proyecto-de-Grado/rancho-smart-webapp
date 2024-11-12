import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTratamientoDialogComponent } from './crear-tratamiento-dialog.component';

describe('CrearTratamientoDialogComponent', () => {
  let component: CrearTratamientoDialogComponent;
  let fixture: ComponentFixture<CrearTratamientoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTratamientoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTratamientoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
