import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListingsComponent } from './pages/listings/listings.component';
import { CreateListingComponent } from './pages/create-listing/create-listing.component';
import { AccountComponent } from './pages/my-account/my-account.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', component: ListingsComponent },
  { path: 'sell', component: CreateListingComponent },
  { path: 'account', component: AccountComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
];
