import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { LoginCreds, RegisterCreds, User } from '../../types/user';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);
  private baseUrl = environment.apiUrl;

  register(creds: RegisterCreds) {
    return this.http.post<User>(
      this.baseUrl + 'account/register',
      creds
    );
  }

  login(creds: LoginCreds) {
    return this.http.post<User>(
      this.baseUrl + 'account/login',
      creds
    ).pipe(
      tap((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}