import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLoteDialogComponent } from './crear-lote-dialog.component';

describe('CrearLoteDialogComponent', () => {
  let component: CrearLoteDialogComponent;
  let fixture: ComponentFixture<CrearLoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearLoteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearLoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
