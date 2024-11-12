import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAnimalVentaComponent } from './crear-animal-venta.component';

describe('CrearAnimalVentaComponent', () => {
  let component: CrearAnimalVentaComponent;
  let fixture: ComponentFixture<CrearAnimalVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAnimalVentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAnimalVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
