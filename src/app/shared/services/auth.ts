import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { LoginResponse, SignUpResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  isLogged = signal(false);

  constructor() {
    const activeUser = localStorage.getItem('activeUser');
    if (activeUser) {
      this.isLogged.set(true);
    }
  }

  login(user: User): LoginResponse {
    const userStr = localStorage.getItem(user.email);

    if (userStr && user.password === JSON.parse(userStr)['password']) {
      this.isLogged.set(true);
      localStorage.setItem('activeUser', userStr);
      return { success: true };
    }

    return { success: false };
  }

  signUp(user: User): SignUpResponse {
    if (localStorage.getItem(user.email)) {
      return { success: false, message: 'El usuario ya existe' };
    }

    localStorage.setItem(user.email, JSON.stringify(user));

    this.isLogged.set(true);
    localStorage.setItem('activeUser', JSON.stringify(user));

    return { success: true, message: 'Home' };
  }

  logout(): void {
    localStorage.removeItem('activeUser');
    this.isLogged.set(false);
  }

  getActiveUser(): User | null {
    const activeUser = localStorage.getItem('activeUser');
    return activeUser ? JSON.parse(activeUser) : null;
  }
}
