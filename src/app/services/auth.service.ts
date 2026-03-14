import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

type LoginResponse = {
  token: string;
};

type RegisterResponse = {
  success?: boolean;
  message: string;
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
  private readonly baseUrl = `${environment.apiUrl}/api/auth`;
  private readonly tokenKey = 'auth_token';

  private user: CurrentUser | null = null;

  constructor(private http: HttpClient) {
    if (this.getToken()) {
      this.loadCurrentUser().subscribe({
        error: () => this.logout(),
      });
    }
  }

  register(payload: {
    firstName: string;
    lastName: string;
    username?: string | null;
    email: string;
    password: string;
    phone?: string | null;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
  }): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.baseUrl}/register`,
      payload,
    );
  }

  login(payload: {
    username: string;
    password: string;
  }): Observable<CurrentUser> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, payload).pipe(
      tap((res) => {
        console.log('LOGIN RESPONSE:', res);
        this.setToken(res.token);
      }),
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
      .get<CurrentUser>(`${environment.apiUrl}/api/users/me`)
      .pipe(
        tap((user) => {
          this.user = user;
        }),
      );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
}
