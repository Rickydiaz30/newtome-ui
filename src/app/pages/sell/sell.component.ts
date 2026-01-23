import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

type Category = {
  id: number;
  name: string;
  description: string;
  active: boolean;
};

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent implements OnInit {
  private categoriesUrl = 'http://localhost:8081/api/categories';

  model = {
    title: '',
    description: '',
    color: '',
    price: null as number | null,
    city: '',
    status: 'ACTIVE',
    categoryId: null as number | null,
  };

  categories: Array<{ id: number; name: string }> = [];
  loadingCategories = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.loadingCategories = true;

    this.http.get<Category[]>(this.categoriesUrl).subscribe({
      next: (data) => {
        // Only active categories, mapped for UI
        this.categories = data
          .filter((c) => c.active)
          .map((c) => ({ id: c.id, name: c.name }));

        this.loadingCategories = false;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
        this.loadingCategories = false;
      },
    });
  }

  submit() {
    const url = 'http://localhost:8081/api/listings';

    this.http
      .post(url, {
        title: this.model.title,
        description: this.model.description,
        color: this.model.color,
        price: this.model.price,
        city: this.model.city,
        categoryId: this.model.categoryId,
      })
      .subscribe({
        next: (response) => {
          console.log('Listing created:', response);
        },
        error: (err) => {
          console.error('Error creating listing:', err);
        },
      });
  }

  saveDraft() {
    this.model.status = 'DRAFT';
    console.log('Saving draft:', this.model);
  }
}
