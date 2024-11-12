import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAnimalDialogComponent } from './crear-animal-dialog.component';

describe('CrearAnimalDialogComponent', () => {
  let component: CrearAnimalDialogComponent;
  let fixture: ComponentFixture<CrearAnimalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAnimalDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAnimalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
