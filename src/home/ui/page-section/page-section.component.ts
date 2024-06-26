import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-section',
  standalone: true,
  imports: [],
  templateUrl: './page-section.component.html',
  styleUrl: './page-section.component.scss',
})
export class PageSectionComponent {
  @Input({ required: true }) title?: string;
}
