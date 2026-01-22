import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent {
  gotClicked() {
    console.log('I got clicked');
  }
}
