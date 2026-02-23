import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { SellComponent } from './pages/sell/sell.component';
import { AccountComponent } from './pages/account/account.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'sell', component: SellComponent },
  { path: 'account', component: AccountComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
];
