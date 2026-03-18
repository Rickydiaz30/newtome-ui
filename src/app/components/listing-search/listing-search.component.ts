import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listing-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listing-search.component.html',
})
export class ListingSearchComponent {
  searchQuery: string = '';
  searchTimeout: any;

  @Output() search = new EventEmitter<string>();

  onSearchChange() {
    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.search.emit(this.searchQuery);
    }, 300);
  }
}
