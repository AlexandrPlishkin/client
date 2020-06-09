import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdvertiserComponent} from './advertiser/advertiser.component';
import {CampaignComponent} from './campaign/campaign.component';
import {LoginComponent} from './auth/login/login.component';
import {RegistrationComponent} from './auth/registration/registration.component';
import {AuthGuard} from './auth/auth.guard';
import {EditComponent} from './advertiser/edit/edit.component';
import {UserComponent} from './user/user.component';
import {ProfileComponent} from './user/profile/profile.component';
import {EditcampaignComponent} from './campaign/editcampaign/editcampaign.component';

const routes: Routes = [
  {
    path: 'advertisers',
    canActivate: [AuthGuard],
    component: AdvertiserComponent,
    data: {}
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
  },
  {
    path: 'advertisers-edit',
    canActivate: [AuthGuard],
    component: EditComponent,
    data: {title: 'EditAdvertiser'}
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: UserComponent,
    data: {title: 'List of Users'}
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
    data: {title: 'UserProfile'}
  },
  {
    path: 'campaigns-edit',
    canActivate: [AuthGuard],
    component: EditcampaignComponent,
    data: {title: 'EditCampaign'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
