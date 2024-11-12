import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FincasComponent } from './fincas.component';

describe('FincasComponent', () => {
  let component: FincasComponent;
  let fixture: ComponentFixture<FincasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FincasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FincasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
