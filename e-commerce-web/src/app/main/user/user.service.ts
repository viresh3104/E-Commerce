import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = 'http://localhost:5000/api/user';
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
  }

  // loading all categories and products for dashbaord
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/getcategories`, {
      headers: this.getHeaders(),
    });
  }

  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/getproducts`, {
      params: { category_id: categoryId.toString() },
    });
  }

  getCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/getcategory`, {
      params: { category_id: categoryId.toString() },
    });
  }

  // for wishlist
  getWishlist(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/wishlist`, {
      headers: this.getHeaders(),
    });
  }

  addToWishlist(product: any): Observable<any> {
    return this.http.post(
      `${this.baseURL}/wishlist/add`,
      { productId: product.product_id },
      { headers: this.getHeaders() }
    );
  }

  removeWishlist(productId: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/wishlist/remove/${productId}`, {
      headers: this.getHeaders(),
    });
  }

  // for user profile
  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/profile`, {
      headers: this.getHeaders(),
    });
  }

  updateUserProfile(data: any): Observable<any> {
    return this.http.patch(`${this.baseURL}/profile`, data, {
      headers: this.getHeaders(),
    });
  }

  // getting product by id
  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/getproduct`, {
      params: { product_id: productId.toString() },
    });
  }
}
