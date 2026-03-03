import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  model = {
    username: '',
    password: '',
  };

  loading = false;
  error: string | null = null;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  submit() {
    this.error = null;
    this.loading = true;

    this.auth.login(this.model).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/account', { replaceUrl: true }); // or '/sell'
      },
      error: (err) => {
        this.loading = false;
        this.error =
          err?.error?.message ||
          err?.error ||
          'Login failed. Check username/password.';
      },
    });
  }
}
