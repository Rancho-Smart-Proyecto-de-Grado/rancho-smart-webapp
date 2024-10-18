import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroGenealogiaComponent } from './registro-genealogia.component';

describe('RegistroGenealogiaComponent', () => {
  let component: RegistroGenealogiaComponent;
  let fixture: ComponentFixture<RegistroGenealogiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroGenealogiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroGenealogiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
