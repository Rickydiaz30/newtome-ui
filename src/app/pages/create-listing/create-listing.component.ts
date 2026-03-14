import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { ListingService } from 'src/app/services/listing-service';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { delay } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/api-response';
import { environment } from 'src/environments/environment';
import { CategoryService } from 'src/app/services/category-service';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

type Category = {
  id: number;
  name: string;
};

type ListingStatus = 'ACTIVE' | 'DRAFT';

@Component({
  selector: 'app-create-listing',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SpinnerComponent],
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css'],
})
export class CreateListingComponent implements OnInit {
  model = {
    title: '',
    description: '',
    color: '',
    price: null as number | null,
    city: '',
    status: 'ACTIVE' as ListingStatus,
    categoryId: null as number | null,
    imageUrl: '',
  };

  previewUrl: string | null = null;
  selectedFile: File | null = null;

  categories: Category[] = [];
  loadingCategories = false;

  submitting = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private categoryService: CategoryService,
    private listingService: ListingService,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.loadingCategories = true;

    this.categoryService
      .getCategories()
      .pipe(finalize(() => (this.loadingCategories = false)))
      .subscribe({
        next: (categories) => {
          console.log('Categories from API:', categories);

          this.categories = (categories ?? []).sort((a, b) =>
            a.name.localeCompare(b.name),
          );

          if (this.categories.length === 0) {
            this.errorMsg = 'No categories available.';
          } else {
            this.errorMsg = '';
          }
          console.log(Array.isArray(categories));
        },
        error: (err) => {
          console.error('Failed to load categories', err);
          this.errorMsg = 'Failed to load categories. Try again.';
        },
      });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    this.selectedFile = file;

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  private isValidForSubmit(): boolean {
    if (!this.model.title.trim()) return false;
    if (!this.model.description.trim()) return false;
    if (!this.model.city.trim()) return false;
    if (this.model.categoryId == null) return false;
    return true;
  }

  private uploadImageIfNeeded(): Observable<any> {
    if (!this.selectedFile) {
      return of(null);
    }

    return this.listingService.getPresignedUrl(this.selectedFile.name).pipe(
      switchMap((res: any) =>
        this.http.put(res.uploadUrl, this.selectedFile!, {}).pipe(
          tap(() => {
            this.model.imageUrl = res.imageUrl;
          }),
        ),
      ),
    );
  }

  submit() {
    if (this.submitting) return;

    if (this.model.status === 'ACTIVE' && !this.isValidForSubmit()) {
      this.errorMsg = 'Please fill in Title, Description, City, and Category.';
      return;
    }

    this.submitting = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.uploadImageIfNeeded()
      .pipe(
        switchMap(() => {
          const payload = {
            title: this.model.title,
            description: this.model.description,
            color: this.model.color,
            price: this.model.price ?? undefined,
            city: this.capitalizeCity(this.model.city),
            status: this.model.status,
            categoryId: this.model.categoryId ?? undefined,
            imageUrl:
              this.model.imageUrl ||
              'https://d3qyvu5wcarbxw.cloudfront.net/assets/images/ninjaBlender.webp',
          };

          return this.listingService.create(payload);
        }),
        delay(1000),
        finalize(() => (this.submitting = false)),
      )
      .subscribe({
        next: () => {
          this.successMsg =
            this.model.status === 'DRAFT' ? 'Draft saved.' : 'Listing created.';

          if (this.model.status === 'ACTIVE') {
            this.router.navigate(['/shop']).then(() => this.resetForm());
          }
        },
        error: () => {
          this.errorMsg = 'Failed to create listing.';
        },
      });
  }

  capitalizeCity(city: string | undefined): string | undefined {
    if (!city) return city;
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  }

  saveDraft() {
    const previousStatus = this.model.status;
    this.model.status = 'DRAFT';
    this.submit();
    this.model.status = previousStatus;
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
      imageUrl: '',
    };
  }
}
