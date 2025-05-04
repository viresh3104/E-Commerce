import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:5000/api/user';

  constructor(private http: HttpClient) {}

  createCategory(categoryDataForm: any) {
    return this.http.post(`${this.apiUrl}/createcategory`, categoryDataForm);
  }

  createProduct(productFormData: any) {
    return this.http.post(`${this.apiUrl}/createproduct`, productFormData);
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getcategories`);
  }

  getProductsByCategory(categoryId: number): Observable<any[]> {
    console.log('calling the api for products');
    return this.http.get<any[]>(`${this.apiUrl}/getproducts`, {
      params: { category_id: categoryId.toString() },
    });
  }

  getCateogory(categoryId: number) {}
}
