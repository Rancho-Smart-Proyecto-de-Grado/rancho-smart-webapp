import { Component, OnInit } from '@angular/core';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-superior',
  standalone: true,
  imports: [
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    NgIf,
    NgFor
  ],
  templateUrl: './navbar-superior.component.html',
  styleUrls: ['./navbar-superior.component.css']
})
export class NavbarSuperiorComponent implements OnInit {
  role: string = '';
  username: string = '';
  appVersion: string = '';

  sede: string = '';
  sedes: any[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const user = await this.getUser();
    console.log('User:', user);

    if (user) {
      this.username = `${user.nombre} ${user.apellido}`;
      this.role = user.credencial.rol;
    }
  }


  async getUser(): Promise<any> {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        return JSON.parse(user);
      }
    }
    return null;
  }


}
