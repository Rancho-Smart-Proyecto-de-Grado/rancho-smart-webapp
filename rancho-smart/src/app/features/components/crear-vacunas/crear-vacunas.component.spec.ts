import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearVacunasComponent } from './crear-vacunas.component';

describe('CrearVacunasComponent', () => {
  let component: CrearVacunasComponent;
  let fixture: ComponentFixture<CrearVacunasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearVacunasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearVacunasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
