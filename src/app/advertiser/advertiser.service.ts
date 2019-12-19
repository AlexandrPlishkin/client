import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Advertiser} from './advertiser';
import {PageableAdvertiser} from "./pageableAdvertiser";

const apiUrl = 'http://localhost:8080/api/v1/advertisers';

const apiUrlPage = 'http://localhost:8080/api/v1/advertisers/?page=';


@Injectable({
  providedIn: 'root'
})
export class AdvertiserService {

  constructor(private http: HttpClient) {
  }

  createAdvertiser(advertiser: Advertiser): Observable<Advertiser[]> {
    return this.http.post<Advertiser[]>(apiUrl, advertiser)
      .pipe(
        tap(_ => this.log('New Advertiser')),
        catchError(this.handleError('create Advertiser', []))
      );
  }

  getAdvertisers(page: number): Observable<any> {
    return this.http.get<PageableAdvertiser>(apiUrlPage + page + '&size=3')
      .pipe(
        tap(_ => this.log('getAdvertisers')),
        catchError(this.handleError('get Advertisers', ))
      );
  }




  updateAdvertiser(advertiser: Advertiser): Observable<Advertiser[]> {
    return this.http.put<Advertiser[]>(apiUrl, advertiser)
      .pipe(
        tap(_ => this.log(' Updated Advertiser')),
        catchError(this.handleError('updateAdvertiser', []))
      );
  }

  deleteAdvertiser(id: number): Observable<Advertiser[]> {
    return this.http.delete<Advertiser[]>(apiUrl + '/' + id)
      .pipe(
        tap(_ => this.log('deleted')),
        catchError(this.handleError('deleteAdvertiser', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error.toString());
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

}
