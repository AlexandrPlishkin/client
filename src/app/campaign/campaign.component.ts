import {Component, OnInit, ViewChild} from '@angular/core';
import {Campaign} from './campaign';
import {Router} from '@angular/router';
import {CampaignService} from './campaign.service';
import {PageableCampaign} from './pageableCampaign';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  data: Campaign[] = [];
  pageCampaign: PageableCampaign;
  displayedColumns: string[] = ['campaignId', 'campaignLink', 'campaignContent', 'destinationCountries', 'languages', 'Functions'];
  isLoadingResults = true;
  selectedPage = 0;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  id = window.history.state.id;

  constructor(private campaignService: CampaignService, private router: Router) {
  }

  ngOnInit() {
    if (!localStorage.getItem('advertiserId')) {
      localStorage.setItem('advertiserId', this.id);
    }
    this.getCampaigns(Number(localStorage.getItem('advertiserId')), this.selectedPage);
    console.log(this.selectedPage);
    console.log(this.paginator);
  }

  getCampaigns(advertiserId: number, page: number): void {
    this.campaignService.getCampaigns(advertiserId, page)
      .subscribe(pageCampaign => {
        this.data = pageCampaign.content;
        console.log(this.data);
        this.pageCampaign = pageCampaign;
        console.log(this.pageCampaign);
        this.paginator.length = this.pageCampaign.totalElements;
        this.selectedPage = page;
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

  handlePage(event) {
    console.log(event);
    this.campaignService.getCampaigns(Number(localStorage.getItem('advertiserId')), event.pageIndex).subscribe(pageCampaign => {
      this.data = pageCampaign.content;
      console.log(this.data);
      this.pageCampaign = pageCampaign;
      this.selectedPage = event.pageIndex;
      this.isLoadingResults = false;
    });
  }

}
