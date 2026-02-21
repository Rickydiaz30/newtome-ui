import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  mobileOpen = false;
  dropdownOpen = false;

  constructor(
    public auth: AuthService,
    private router: Router,
  ) {}

  get displayName(): string {
    const u = this.auth.getUser();
    console.log(this.auth.getUser());
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

    // If we close the mobile menu, also close dropdown
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

  // Close menus if you tap/click outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('[data-nav]')) {
      this.closeAll();
    }
  }

  // Close on ESC
  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeAll();
  }
}
