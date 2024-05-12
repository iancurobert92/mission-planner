import { Injectable } from '@angular/core';
import { MissionService } from '@shared/data-access';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Point } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private targetPointsSubj = new BehaviorSubject<Point[]>([]);

  get targetPoints$() {
    return this.targetPointsSubj.asObservable();
  }

  constructor(private missionDataService: MissionService) {}

  getTargetPoints(): Observable<Point[]> {
    return this.missionDataService
      .getMissionTargetPoints()
      .pipe(tap((value) => this.targetPointsSubj.next(value)));
  }
}
