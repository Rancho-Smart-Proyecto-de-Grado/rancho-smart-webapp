import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesSaludComponent } from './reportes-salud.component';

describe('ReportesSaludComponent', () => {
  let component: ReportesSaludComponent;
  let fixture: ComponentFixture<ReportesSaludComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesSaludComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesSaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
