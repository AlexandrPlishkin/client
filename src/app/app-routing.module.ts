import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdvertiserComponent} from './advertiser/advertiser.component';
import {CampaignComponent} from './campaign/campaign.component';
import {LoginComponent} from './auth/login/login.component';
import {RegistrationComponent} from './auth/registration/registration.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'advertisers',
    canActivate: [AuthGuard],
    component: AdvertiserComponent,
    data: {title: 'Advertiser'}
  },
  {
    path: 'campaigns',
    canActivate: [AuthGuard],
    component: CampaignComponent,
    data: {title: 'List of Campaigns'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Login'}
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    data: {title: 'Registration'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
