import {Component, OnInit} from '@angular/core';
import {Campaign} from "./campaign";
import {Router} from "@angular/router";
import {CampaignService} from "./campaign.service";
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  data: Campaign[] = [];
  displayedColumns: string[] = ['campaignId', 'campaignLink', 'campaignContent', 'destinationCountries', 'languages', 'Functions'];
  isLoadingResults = true;
  id = window.history.state.id;

  constructor(private campaignService: CampaignService, private router: Router) {
  }

  ngOnInit() {
    console.log('current advertiser id = ', this.id);
    this.getCampaigns(this.id);

  }

  getCampaigns(advertiserId: number): void {
    this.campaignService.getCampaigns(advertiserId)
      .subscribe(campaigns => {
        this.data = campaigns;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
