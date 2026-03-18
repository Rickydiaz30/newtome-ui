import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Listing } from 'src/app/models/listing.model';
import { ListingCardComponent } from '../listing-card/listing-card.component';

@Component({
  selector: 'app-listing-grid',
  standalone: true,
  imports: [CommonModule, ListingCardComponent],
  templateUrl: './listing-grid.component.html',
})
export class ListingGridComponent {
  @Input() listings: Listing[] = [];
  @Output() select = new EventEmitter<Listing>();
}
