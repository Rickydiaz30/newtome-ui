import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { environment } from '../../environments/environment';

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesUrl = `${environment.apiUrl}/api/categories`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<any>(this.categoriesUrl).pipe(
      map((res) => {
        console.log('RAW CATEGORY RESPONSE:', res);

        if (Array.isArray(res)) {
          return res;
        }

        if (res && Array.isArray(res.data)) {
          return res.data;
        }

        return [];
      }),
    );
  }
}
