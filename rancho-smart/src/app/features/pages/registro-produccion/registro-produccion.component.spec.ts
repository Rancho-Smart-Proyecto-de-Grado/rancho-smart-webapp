import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroProduccionComponent } from './registro-produccion.component';

describe('RegistroProduccionComponent', () => {
  let component: RegistroProduccionComponent;
  let fixture: ComponentFixture<RegistroProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroProduccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
