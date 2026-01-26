import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { SellComponent } from './pages/sell/sell.component';
import { AccountComponent } from './pages/account/account.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { LearnMoreComponent } from './pages/learn-more/learn-more.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'sell', component: SellComponent },
  { path: 'account', component: AccountComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'learn-more', component: LearnMoreComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
];
