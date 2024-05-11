import { Component } from '@angular/core';
import { CoordinatesInputComponent } from '../coordinates-input/coordinates-input.component';
import { CoordinatesTableComponent } from '../coordinates-table/coordinates-table.component';

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [CoordinatesInputComponent, CoordinatesTableComponent],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss',
})
export class PlannerComponent {}
