import { Injectable } from '@angular/core';
import {Advertiser} from "../advertiser/advertiser";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Campaign} from "./campaign";

const apiUrl = 'http://localhost:8080/api/v1/advertisers{advertiserId}/campaigns';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }


  createCampaign(campaign: Campaign): Observable<Campaign[]> {
    return this.http.post<Campaign[]>(apiUrl, campaign)
      .pipe(
        tap(_ => this.log('New Campaign')),
        catchError(this.handleError('createCampaign', []))
      );
  }

  // TODO check []
  getAdvertiser(id: number): Observable<Advertiser[]> {
    return this.http.get<Advertiser[]>(apiUrl + '/' + id)
      .pipe(
        tap(_ => this.log('Advertiser')),
        catchError(this.handleError('getAdvertiser', []))
      );
  }

  getAdvertisers(): Observable<Advertiser[]> {
    return this.http.get<Advertiser[]>(apiUrl)
      .pipe(
        tap(_ => this.log('Advertiser')),
        catchError(this.handleError('getAdvertisers', []))
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

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
