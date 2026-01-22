import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from 'src/app/pages/home/sections/logo/logo.component';
import { HeroComponent } from 'src/app/pages/home/sections/hero/hero.component';
import { SectionOneComponent } from 'src/app/pages/home/sections/section-one/section-one.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LogoComponent, HeroComponent, SectionOneComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
