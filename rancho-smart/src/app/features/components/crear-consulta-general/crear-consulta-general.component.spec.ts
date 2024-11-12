import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearConsultaGeneralComponent } from './crear-consulta-general.component';

describe('CrearConsultaGeneralComponent', () => {
  let component: CrearConsultaGeneralComponent;
  let fixture: ComponentFixture<CrearConsultaGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearConsultaGeneralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearConsultaGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
