import { Component, DestroyRef, inject } from '@angular/core';
import { CoordinatesInputComponent } from '../coordinates-input/coordinates-input.component';
import { CoordinatesTableComponent } from '../coordinates-table/coordinates-table.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PlannerService } from '../../data-access/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [
    CoordinatesInputComponent,
    CoordinatesTableComponent,
    MatButton,
    MatIcon,
  ],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss',
})
export class PlannerComponent {
  private destroyRef = inject(DestroyRef);

  constructor(private plannerService: PlannerService) {}

  onDeleteButtonClick() {
    this.plannerService
      .deleteAllCoordinates()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
