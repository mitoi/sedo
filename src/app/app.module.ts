import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { ToolbarComponent } from './views/toolbar/toolbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

import { JobGridComponent } from './views/job-grid/job-grid.component';
import { JobGridItemComponent } from './components/job-grid-item/job-grid-item.component';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryListItemComponent } from './components/category-list-item/category-list-item.component';
import { HomeSearchCategoryComponent } from './views/home-search-category/home-search-category.component';
import {MatListModule} from "@angular/material/list";

import { LoginComponent } from './layouts/login/login.component';
import { HomeComponent } from './layouts/home/home.component';
import { RegisterComponent } from './layouts/register/register.component';

import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemComponent } from './views/item/item.component';
import {NgxGalleryModule} from "@kolkov/ngx-gallery";
import { JobSuggestionsComponent } from './views/job-suggestions/job-suggestions.component';
import { JobComponent } from './layouts/job/job.component';
import {ScrollingModule} from '@angular/cdk/scrolling';

import { HttpClientModule } from '@angular/common/http';
import { AddPostComponent } from './layouts/add-post/add-post.component';
import { AddPostFormComponent } from './views/add-post-form/add-post-form.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SettingsComponent } from './layouts/settings/settings.component';
import { UserInfoComponent } from './views/user-info/user-info.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToolbarComponent,
    JobGridComponent,
    JobGridItemComponent,
    SearchBarComponent,
    CategoryListComponent,
    CategoryListItemComponent,
    HomeSearchCategoryComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ItemComponent,
    JobSuggestionsComponent,
    JobComponent,
    AddPostComponent,
    AddPostFormComponent,
    SettingsComponent,
    UserInfoComponent,
    UserDataComponent,
    UserPostsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    NgxGalleryModule,
    ScrollingModule,
    HttpClientModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
