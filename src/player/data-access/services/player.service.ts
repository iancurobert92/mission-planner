import { Injectable } from '@angular/core';
import { Coordinate, MissionService } from '@shared/data-access';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private targetPointsSubj = new BehaviorSubject<Coordinate[]>([]);

  get targetPoints$() {
    return this.targetPointsSubj.asObservable();
  }

  constructor(private missionDataService: MissionService) {}

  getTargetPoints(): Observable<Coordinate[]> {
    return this.missionDataService
      .getMissionTargetPoints()
      .pipe(tap((value) => this.targetPointsSubj.next(value)));
  }
}
