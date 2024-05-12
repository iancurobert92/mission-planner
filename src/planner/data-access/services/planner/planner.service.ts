import { Injectable } from '@angular/core';
import { ArrayUtils } from '@planner/util';
import { Coordinate, MissionService } from '@shared/data-access';
import { BehaviorSubject, EMPTY, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  private coordinatesSubj = new BehaviorSubject<Coordinate[]>([]);

  get coordinates$(): Observable<Coordinate[]> {
    return this.coordinatesSubj.asObservable();
  }

  constructor(private missionService: MissionService) {}

  getCoordinates() {
    return this.missionService
      .getMissionTargetPoints()
      .pipe(tap((value) => this.coordinatesSubj.next(value)));
  }

  addCoordinate(value: Coordinate) {
    if (ArrayUtils.hasElement(value, this.coordinatesSubj.value, ['name'])) {
      alert(`The entry with the name "${value.name}" already exists.`);
      return EMPTY;
    }

    if (ArrayUtils.hasElement(value, this.coordinatesSubj.value, ['x', 'y'])) {
      alert('These coordonates already exists');
      return EMPTY;
    }

    return this.missionService
      .addMissionTargetPoint(value)
      .pipe(tap((value) => this.coordinatesSubj.next(value)));
  }

  deleteAllCoordinates() {
    return this.missionService
      .deleteAllMissionTargetPoints()
      .pipe(tap((value) => this.coordinatesSubj.next(value)));
  }
}
