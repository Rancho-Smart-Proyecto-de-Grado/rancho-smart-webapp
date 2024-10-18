import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroVacunacionComponent } from './registro-vacunacion.component';

describe('RegistroVacunacionComponent', () => {
  let component: RegistroVacunacionComponent;
  let fixture: ComponentFixture<RegistroVacunacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroVacunacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroVacunacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
