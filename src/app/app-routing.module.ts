import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './layouts/home/home.component';
import { JobComponent } from './layouts/job/job.component';
import { LoginComponent } from './layouts/login/login.component';
import { RegisterComponent } from './layouts/register/register.component';
import {ItemComponent} from "./views/item/item.component";
import { AuthGuard } from './helpers/auth.guard';
import { AddPostComponent } from './layouts/add-post/add-post.component';
import { SettingsComponent } from './layouts/settings/settings.component';
import {MyAdsComponent} from "./layouts/my-ads/my-ads.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'item/:id', component: JobComponent},
  { path: 'add_post', component: AddPostComponent, canActivate: [AuthGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
    { path: 'my_ads', component: MyAdsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
