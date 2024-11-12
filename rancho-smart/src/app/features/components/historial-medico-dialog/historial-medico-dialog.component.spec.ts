import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialMedicoDialogComponent } from './historial-medico-dialog.component';

describe('HistorialMedicoDialogComponent', () => {
  let component: HistorialMedicoDialogComponent;
  let fixture: ComponentFixture<HistorialMedicoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialMedicoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialMedicoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
