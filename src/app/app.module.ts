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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
