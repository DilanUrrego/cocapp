import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { LoginResponse, SignUpResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/v1/auth'; // URL de tu backend
  
  isLogged = signal(false);

  constructor() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.isLogged.set(true);
    }
  }

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, user)
      .pipe(
        tap(response => {
          if (response.success) {
            this.isLogged.set(true);
            // Guardar token si tu backend lo devuelve
            if (response.token) {
              localStorage.setItem('authToken', response.token);
            }
            // Guardar información del usuario
            localStorage.setItem('activeUser', JSON.stringify(user));
          }
        })
      );
  }

  signUp(user: User): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(`${this.apiUrl}/register`, user)
      .pipe(
        tap(response => {
          if (response.success) {
            this.isLogged.set(true);
            // Guardar token si tu backend lo devuelve
            if (response.token) {
              localStorage.setItem('authToken', response.token);
            }
            localStorage.setItem('activeUser', JSON.stringify(user));
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('activeUser');
    localStorage.removeItem('authToken');
    this.isLogged.set(false);
  }

  getActiveUser(): User | null {
    const activeUser = localStorage.getItem('activeUser');
    return activeUser ? JSON.parse(activeUser) : null;
  }
}