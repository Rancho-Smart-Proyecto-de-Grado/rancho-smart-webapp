import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FincaDialogComponent } from './finca-dialog.component';

describe('FincaDialogComponent', () => {
  let component: FincaDialogComponent;
  let fixture: ComponentFixture<FincaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FincaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FincaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
