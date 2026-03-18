import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

  public user: CurrentUser | null = null;

  constructor(private http: HttpClient) {}

  private userSubject = new BehaviorSubject<CurrentUser | null>(null);
  public user$ = this.userSubject.asObservable();

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
      tap((res) => this.setToken(res.token)),
      switchMap(() => this.loadCurrentUser()),
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.user = null;
    this.userSubject.next(null);
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
          this.userSubject.next(user);
        }),
      );
  }

  restoreSession(): Observable<CurrentUser | null> {
    if (!this.getToken()) {
      return of(null);
    }

    return this.loadCurrentUser();
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
}
