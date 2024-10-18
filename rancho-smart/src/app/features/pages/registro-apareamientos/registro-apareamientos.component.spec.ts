import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroApareamientosComponent } from './registro-apareamientos.component';

describe('RegistroApareamientosComponent', () => {
  let component: RegistroApareamientosComponent;
  let fixture: ComponentFixture<RegistroApareamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroApareamientosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroApareamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
