import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {User} from "./user";

const apiUrl = 'http://localhost:8080/api/v1/users';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  createUser(user: User): Observable<User[]> {
    return this.http.post<User[]>(apiUrl, user)
      .pipe(
        tap(_ => this.log('New User')),
        catchError(this.handleError('create User', []))
      );
  }

  getUser(username: string): Observable<User[]> {
    return this.http.get<User[]>(apiUrl + '/' + username)
      .pipe(
        tap(_ => this.log('User')),
        catchError(this.handleError('get User', []))
      );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(apiUrl)
      .pipe(
        tap(_ => this.log('get Users')),
        catchError(this.handleError('get Users', []))
      );
  }

  updateUser(user: User): Observable<User[]> {
    return this.http.put<User[]>(apiUrl, user)
      .pipe(
        tap(_ => this.log('User Updated')),
        catchError(this.handleError('update User', []))
      );
  }

  deleteUser(id: number): Observable<User[]> {
    return this.http.delete<User[]>(apiUrl + '/' + id)
      .pipe(
        tap(_ => this.log('deleted')),
        catchError(this.handleError('delete User', []))
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


}
