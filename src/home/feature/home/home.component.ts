import { Component } from '@angular/core';
import { PageSectionComponent } from '@home/ui';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PageSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
