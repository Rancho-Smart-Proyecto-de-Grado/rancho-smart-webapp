import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSuperiorLandpageComponent } from './navbar-superior-landpage.component';

describe('NavbarSuperiorLandpageComponent', () => {
  let component: NavbarSuperiorLandpageComponent;
  let fixture: ComponentFixture<NavbarSuperiorLandpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarSuperiorLandpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarSuperiorLandpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
