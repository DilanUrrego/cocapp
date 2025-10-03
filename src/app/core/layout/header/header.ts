import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Auth } from '../../../shared/services/auth';
import { User } from '../../../shared/interfaces/user';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatButtonModule, UpperCasePipe],
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

  logout() {
    this.auth.isLogged.set(false);
    localStorage.removeItem('activeUser');

    this.router.navigate(['/']);
  }
}

