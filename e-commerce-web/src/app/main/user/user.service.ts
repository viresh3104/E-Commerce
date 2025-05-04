import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = 'http://localhost:5000/api/user';
  constructor(private http: HttpClient) {}

  getCateogory(categoryId: number) {}
}
