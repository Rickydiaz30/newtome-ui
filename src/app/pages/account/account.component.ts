import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

type MeResponse = {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
};

@Component({
  selector: 'app-account',
  standalone: true,
  templateUrl: './account.component.html',
  imports: [CommonModule, RouterLink],
})
export class AccountComponent implements OnInit {
  user: MeResponse | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadMe();
  }

  loadMe() {
    this.loading = true;
    this.error = null;

    // Your interceptor should attach Bearer token automatically
    this.http.get<MeResponse>('http://localhost:8081/api/users/me').subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to load account.';
      },
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
