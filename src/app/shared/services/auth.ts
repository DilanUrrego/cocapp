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
  private apiUrl = 'http://localhost:3000/api/v1/auth';
  
  isLogged = signal(false);

  constructor() {
    const token = localStorage.getItem('access_token');
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
            console.log('Usuario logueado con éxito');
            console.log(response.access_token);
            if (response.access_token) {
              localStorage.setItem('access_token', response.access_token);
            }
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
            if (response.access_token) {
              localStorage.setItem('access_token', response.access_token);
            }
            localStorage.setItem('activeUser', JSON.stringify(user));
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('activeUser');
    localStorage.removeItem('access_token');
    this.isLogged.set(false);
  }

  getActiveUser(): User | null {
    const activeUser = localStorage.getItem('activeUser');
    return activeUser ? JSON.parse(activeUser) : null;
  }
}