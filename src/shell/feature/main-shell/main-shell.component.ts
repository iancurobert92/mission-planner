import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppBarComponent, NavItem } from '@shell/ui';

@Component({
  selector: 'app-main-shell',
  standalone: true,
  imports: [RouterOutlet, AppBarComponent],
  templateUrl: './main-shell.component.html',
  styleUrl: './main-shell.component.scss',
})
export class MainShellComponent {
  navItems: NavItem[] = [
    {
      id: 'home',
      url: 'home',
      text: 'Home',
    },
    {
      id: 'planner',
      url: 'planner',
      text: 'Planner',
    },
    {
      id: 'player',
      url: 'player',
      text: 'Player',
    },
  ];
}
