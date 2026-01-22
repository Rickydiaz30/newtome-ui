import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
