import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { NavItem } from './nav-item.model';

@Component({
  selector: 'app-app-bar',
  standalone: true,
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    NgFor,
  ],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss',
})
export class AppBarComponent {
  @Input({ required: true }) logoUrl: string = '';
  @Input({ required: true }) logoHref: string = '';
  @Input({ required: true }) shareHref: string = '';
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) navItems: NavItem[] = [];

  onShareButtonClick() {
    window.open(this.shareHref);
  }
}
