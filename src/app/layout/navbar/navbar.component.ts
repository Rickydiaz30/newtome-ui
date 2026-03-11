import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Event,
} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    SpinnerComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  mobileOpen = false;
  dropdownOpen = false;
  loading = false; // to track navigation loading

  // constructor(
  //   public auth: AuthService,
  //   private router: Router,
  // ) {
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationStart) {
  //       this.loading = true;
  //     }

  //     if (
  //       event instanceof NavigationEnd ||
  //       event instanceof NavigationCancel ||
  //       event instanceof NavigationError
  //     ) {
  //       this.loading = false;
  //     }
  //   });
  // }

  constructor(
    public auth: AuthService,
    private router: Router,
  ) {
    let startTime = 0;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
        startTime = Date.now();
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(400 - elapsed, 0);

        setTimeout(() => {
          this.loading = false;
        }, remaining);
      }
    });
  }

  get displayName(): string {
    const u = this.auth.getUser();
    return u?.firstName?.trim() || u?.email || '';
  }

  get loggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  get firstName(): string {
    const firstName = this.auth.getUser()?.firstName;
    if (!firstName) return '';
    return firstName;
  }

  get greeting(): string {
    return this.firstName ? `Hello, ${this.firstName}` : '';
  }

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
    if (!this.mobileOpen) this.dropdownOpen = false;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeAll() {
    this.mobileOpen = false;
    this.dropdownOpen = false;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('[data-nav]')) {
      this.closeAll();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeAll();
  }
}
