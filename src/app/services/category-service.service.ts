import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

@Injectable({
  providedIn: 'root',
})
export class CategoryServiceService {
  private categoriesUrl = 'http://localhost:8081/api/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http
      .get<ApiResponse<Category[]>>(this.categoriesUrl)
      .pipe(map((res) => res.data ?? []));
  }
}
