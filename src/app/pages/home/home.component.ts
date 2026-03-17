import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  searchTerm: string = '';

  constructor(private router: Router) {}

  onSearch() {
    if (!this.searchTerm.trim()) return;

    this.router.navigate(['/shop'], {
      queryParams: { q: this.searchTerm },
    });
  }
}
