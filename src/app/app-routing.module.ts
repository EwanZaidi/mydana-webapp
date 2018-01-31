import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './index/index.component';
import { LoginComponent } from './login/login.component';
import { CampaignComponent } from './campaign/campaign.component';

const routes: Routes = [
  {path:'',component:IndexComponent, pathMatch: 'full'},
  {path:'login', component:LoginComponent},
  {path:'campaign/:id', component:CampaignComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
