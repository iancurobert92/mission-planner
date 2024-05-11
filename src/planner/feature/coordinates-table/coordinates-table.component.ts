import { AsyncPipe } from '@angular/common';
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
import { PlannerService } from '@planner/data-access';

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
