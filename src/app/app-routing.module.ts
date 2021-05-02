import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserOverviewComponent} from './components/user/user-overview/user-overview.component';
import {AuthComponent} from './components/authorization/auth/auth.component';
import {ProfileDetailsComponent} from './components/user/profile-details/profile-details.component';
import {FriendsOverviewComponent} from './components/user/friends-overview/friends-overview.component';


const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'overview', component: UserOverviewComponent},
  {path: 'friends-overview', component: FriendsOverviewComponent},
  {path: 'profile-details', component: ProfileDetailsComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
