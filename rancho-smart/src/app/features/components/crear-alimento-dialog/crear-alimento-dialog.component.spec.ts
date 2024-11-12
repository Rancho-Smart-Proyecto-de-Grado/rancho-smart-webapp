import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAlimentoDialogComponent } from './crear-alimento-dialog.component';

describe('CrearAlimentoDialogComponent', () => {
  let component: CrearAlimentoDialogComponent;
  let fixture: ComponentFixture<CrearAlimentoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAlimentoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAlimentoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
