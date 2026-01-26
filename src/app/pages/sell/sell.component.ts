import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

type Category = {
  id: number;
  name: string;
  description: string;
  active: boolean;
};

type ListingStatus = 'ACTIVE' | 'DRAFT';

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent implements OnInit {
  private categoriesUrl = 'http://localhost:8081/api/categories';
  private listingsUrl = 'http://localhost:8081/api/listings';

  model = {
    title: '',
    description: '',
    color: '',
    price: null as number | null,
    city: '',
    status: 'ACTIVE' as ListingStatus,
    categoryId: null as number | null,
  };

  categories: Array<{ id: number; name: string }> = [];
  loadingCategories = false;

  submitting = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.loadingCategories = true;

    this.http
      .get<Category[]>(this.categoriesUrl)
      .pipe(finalize(() => (this.loadingCategories = false)))
      .subscribe({
        next: (data) => {
          this.errorMsg = '';

          this.categories = (data ?? [])
            .filter((c) => c.active)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((c) => ({ id: c.id, name: c.name }));

          // Optional: if nothing came back
          if (this.categories.length === 0) {
            this.errorMsg = 'No categories available.';
          }
        },

        error: (err) => {
          console.error('Failed to load categories', err);
          this.errorMsg = 'Failed to load categories. Try again.';
        },
      });
  }

  private isValidForSubmit(): boolean {
    // Keep this simple for now—just prevent totally empty listings.
    if (!this.model.title.trim()) return false;
    if (!this.model.description.trim()) return false;
    if (!this.model.city.trim()) return false;
    if (this.model.categoryId == null) return false;
    return true;
  }

  submit() {
    this.errorMsg = '';
    this.successMsg = '';

    if (this.submitting) return;

    // Only enforce validation for ACTIVE submits (drafts can be looser if you want)
    if (this.model.status === 'ACTIVE' && !this.isValidForSubmit()) {
      this.errorMsg = 'Please fill in Title, Description, City, and Category.';
      return;
    }

    this.submitting = true;

    const payload = {
      title: this.model.title,
      description: this.model.description,
      color: this.model.color,
      price: this.model.price,
      city: this.model.city,
      status: this.model.status, // ✅ send status
      categoryId: this.model.categoryId,
    };

    this.http
      .post(this.listingsUrl, payload)
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe({
        next: (response) => {
          console.log('Listing created:', response);

          this.successMsg =
            this.model.status === 'DRAFT' ? 'Draft saved.' : 'Listing created.';

          if (this.model.status === 'ACTIVE') {
            this.router.navigate(['/browse']).then((ok) => {
              console.log('navigate to /browse ok?', ok);

              if (ok) {
                this.resetForm();
              }
            });
          }
        },

        error: (err) => {
          console.error('Error creating listing:', err);
          this.errorMsg = 'Something went wrong saving your listing.';
        },
      });
  }

  saveDraft() {
    // Temporarily set to DRAFT, submit, then reset it back to ACTIVE for next time
    const previousStatus = this.model.status;
    this.model.status = 'DRAFT';
    this.submit();
    this.model.status = previousStatus; // ✅ prevents “sticky draft” behavior
  }

  resetForm() {
    this.model = {
      title: '',
      description: '',
      color: '',
      price: null,
      city: '',
      status: 'ACTIVE',
      categoryId: null,
    };
  }
}
