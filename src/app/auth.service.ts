import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

const apiUrl = 'http://localhost:8080/api/v1/users';
const checkTokenUrl = 'http://localhost:8080/api/v1/advertisers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  redirectUrl: string;

  constructor(private http: HttpClient) {
    if (localStorage.length !== 0) {
      this.isLoggedIn = true;
    }
  }

  login(data: any): Observable<any> {
    return this.http.post(apiUrl + '/login', data, {observe: 'response'})
      .pipe(
        tap(_ => this.isLoggedIn = true),
        tap(_ => localStorage.setItem('username', data.username)),
        catchError(this.handleError('login', []))
      );
  }

  register(data: any): Observable<any> {
    return this.http.post(apiUrl, data)
      .pipe(
        tap(_ => this.log('login')),
        catchError(this.handleError('login', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

  isAdmin() {
    return localStorage.getItem('role') === 'ADMIN';
  }

  getUsernameFromLocalStorage(): string {
    return localStorage.getItem('username');
  }

}
