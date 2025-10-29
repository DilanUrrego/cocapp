import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Auth } from '../../../shared/services/auth';
import { User } from '../../../shared/interfaces/user';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule, 
    MatIconModule, 
    MatButtonModule, 
    UpperCasePipe
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  user: User | null = JSON.parse(localStorage.getItem('activeUser') || 'null');

  private auth = inject(Auth);
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.user = this.auth.getActiveUser();
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  // Método para verificar si una ruta está activa
  isActive(route: string): boolean {
    return this.router.url === `/${route}` || 
           this.router.url.startsWith(`/${route}/`);
  }

  logout() {
    this.auth.isLogged.set(false);
    localStorage.removeItem('activeUser');
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }
}