import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Campaign} from './campaign';

const apiUrl = 'http://localhost:8080/api/v1/advertisers';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) {
  }

  createCampaign(advertiserId: number, campaign: Campaign): Observable<Campaign[]> {
    return this.http.post<Campaign[]>(apiUrl + '/' + advertiserId + '/' + 'campaigns', campaign)
      .pipe(
        tap(_ => this.log('New Campaign')),
        catchError(this.handleError('createCampaign', []))
      );
  }


  getCampaigns(advertiserId: number): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(apiUrl + '/' + advertiserId + '/' + 'campaigns')
      .pipe(
        tap(_ => this.log('Campaigns')),
        catchError(this.handleError('getCampaigns', []))
      );
  }

  updateCampaign(advertiserId: number, campaign: Campaign): Observable<Campaign[]> {
    return this.http.put<Campaign[]>(apiUrl + '/' + advertiserId + '/' + 'campaigns', campaign)
      .pipe(
        tap(_ => this.log(' Updated Campaign')),
        catchError(this.handleError('updateCampaign', []))
      );
  }

  deleteCampaign(advertiserId: number, campaignId: number): Observable<Campaign[]> {
    return this.http.delete<Campaign[]>(apiUrl + '/' + advertiserId + '/' + 'campaigns' + '/' + campaignId)
      .pipe(
        tap(_ => this.log('deleted')),
        catchError(this.handleError('deleteCampaign', []))
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
