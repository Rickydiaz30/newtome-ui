import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterOutlet,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';

import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { environment } from 'src/environments/environment-prod';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    SpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  dropdownOpen = false;
  deferredPrompt: any = null;
  showInstallButton = false;
  loading = false;
  progress = 0;
  private timer: any;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('API URL:', environment.apiUrl);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
        this.progress = 10;

        this.timer = setInterval(() => {
          if (this.progress < 85) {
            this.progress += Math.random() * 8;
          }
        }, 200);
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        clearInterval(this.timer);
        this.progress = 100;

        setTimeout(() => {
          this.loading = false;
          this.progress = 0;
        }, 500);
      }
    });

    // PWA install prompt
    window.addEventListener('beforeinstallprompt', (event: any) => {
      event.preventDefault();

      this.deferredPrompt = event;
      this.showInstallButton = true;
    });
  }

  installApp() {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();

    this.deferredPrompt.userChoice.then(() => {
      this.deferredPrompt = null;
      this.showInstallButton = false;
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('[data-dropdown]')) {
      this.closeDropdown();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeDropdown();
  }
}
