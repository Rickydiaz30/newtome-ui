import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs';

type LoginResponse = { message: string; token: string };
type RegisterResponse = { message: string };

type JwtPayload = {
  sub?: string; // email (subject)
  exp?: number;
  iat?: number;
};

export type CurrentUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = 'http://localhost:8081/api/auth';
  private readonly tokenKey = 'auth_token';

  private user: CurrentUser | null = null;

  constructor(private http: HttpClient) {
    // Restore user on refresh (if token already exists)
  }

  register(payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string | null;
  }): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.baseUrl}/register`,
      payload,
    );
  }

  login(payload: { email: string; password: string }): Observable<CurrentUser> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, payload).pipe(
      tap((res) => this.setToken(res.token)),
      switchMap(() => this.loadCurrentUser()),
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.user = null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): CurrentUser | null {
    return this.user;
  }

  loadCurrentUser(): Observable<CurrentUser> {
    return this.http
      .get<CurrentUser>('http://localhost:8081/api/users/me')
      .pipe(
        tap((user) => {
          this.user = user;
        }),
      );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private decodeJwt(token: string): JwtPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      // base64url -> base64
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');

      const json = atob(padded);
      return JSON.parse(json) as JwtPayload;
    } catch {
      return null;
    }
  }
}
