import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class CreateAccountComponent {
  model = {
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
    email: '',
    password: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
  };

  confirmPassword = '';

  loading = false;
  error: string | null = null;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  get passwordMismatch(): boolean {
    return (
      !!this.model.password &&
      !!this.confirmPassword &&
      this.model.password !== this.confirmPassword
    );
  }

  submit() {
    this.error = null;

    if (this.passwordMismatch) {
      this.error = 'Passwords do not match.';
      return;
    }

    this.loading = true;

    this.auth
      .register({
        firstName: this.model.firstName.trim(),
        lastName: this.model.lastName.trim(),
        username: this.model.username.trim(),
        email: this.model.email.trim(),
        password: this.model.password,
        phone: this.model.phone?.trim() || null,
        streetAddress: this.model.streetAddress.trim(),
        city: this.model.city.trim(),
        state: this.model.state.trim(),
        zipCode: this.model.zipCode.trim(),
      })
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          this.loading = false;
          this.error =
            err?.error?.message ||
            (typeof err?.error === 'string' ? err.error : null) ||
            'Registration failed.';
        },
      });
  }
}
