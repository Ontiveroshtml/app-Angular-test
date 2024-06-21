import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/user/login';

  constructor(private http: HttpClient) { }
 
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { username, password })
      .pipe(
        tap(response => {
          if (response && response.token) {
            // Store the token in localStorage
            if (typeof window !== 'undefined') {
              localStorage.setItem('authToken', response.token);
            }
          }
        })
      );
  }

  isLoggedIn(): boolean {
    // Check if the token exists in localStorage
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }

  logout(): void {
    // Remove the token from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }
}
