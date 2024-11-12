import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-superior-landpage',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
  ],
  templateUrl: './navbar-superior-landpage.component.html',
  styleUrl: './navbar-superior-landpage.component.css'
})
export class NavbarSuperiorLandpageComponent {
  isActive = false;

  constructor() { }

  toggleMenu(): void {
    this.isActive = !this.isActive;
  }
}
