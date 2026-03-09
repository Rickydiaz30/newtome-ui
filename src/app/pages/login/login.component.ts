import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SpinnerComponent],
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
    private route: ActivatedRoute,
  ) {}

  submit() {
    this.error = null;
    this.loading = true;

    this.auth
      .login(this.model)
      .pipe(delay(1000)) // TEMP delay so spinner is visible
      .subscribe({
        next: () => {
          this.loading = false;

          const redirect = this.route.snapshot.queryParamMap.get('redirect');
          const listingId = this.route.snapshot.queryParamMap.get('listingId');

          if (redirect === 'offer' && listingId) {
            this.router.navigate(['/shop'], {
              queryParams: {
                redirect: 'offer',
                listingId: listingId,
              },
              replaceUrl: true,
            });
          } else {
            this.router.navigateByUrl('/shop', { replaceUrl: true });
          }
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
