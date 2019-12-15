import {Component, HostListener, OnInit} from '@angular/core';
import {Campaign} from './campaign';
import {Router} from '@angular/router';
import {CampaignService} from './campaign.service';

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
    if (!localStorage.getItem('advertiserId')) {
      localStorage.setItem('advertiserId', this.id);
    }
    this.getCampaigns(Number(localStorage.getItem('advertiserId')));
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

  edit(campaign: Campaign) {
    this.router.navigate(['campaigns-edit'], {state: campaign});
  }

  deleteCampaign(campaignId: number) {
    this.campaignService.deleteCampaign(this.id, campaignId).subscribe(resp => console.log(resp));
    this.router.navigate(['advertisers']);
  }

  createCampaign() {
    this.router.navigate(['campaigns-edit']);
  }

}
