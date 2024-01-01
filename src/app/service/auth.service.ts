import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  verifyToken(token: string): Observable<any> {
    return this.http.post('https://shiny-waffle-74www79qgj42r6jj-9000.app.github.dev/auth/verify', { token });
  }
}
