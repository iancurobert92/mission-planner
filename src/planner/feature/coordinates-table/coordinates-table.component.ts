import { Component } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { Coordinate } from '../../data-access/models';
import { PlannerService } from '../../data-access/services';
import { AsyncPipe } from '@angular/common';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Coordinate[] = [
  { name: 'Top-left', x: 20, y: 10 },
  { name: 'Top-left', x: 20, y: 10 },
  { name: 'Top-left', x: 20, y: 10 },
];

@Component({
  selector: 'app-coordinates-table',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    AsyncPipe,
  ],
  templateUrl: './coordinates-table.component.html',
  styleUrl: './coordinates-table.component.scss',
})
export class CoordinatesTableComponent {
  displayedColumns: string[] = ['position', 'name', 'x', 'y'];
  coordinates$ = this.plannerService.coordinates$;

  constructor(private plannerService: PlannerService) {}
}
