import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Point } from '../models';
import { MissionDataService } from './mission-data.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private targetPointsSubj = new BehaviorSubject<Point[]>([]);

  get targetPoints$() {
    return this.targetPointsSubj.asObservable();
  }

  constructor(private missionDataService: MissionDataService) {}

  getTargetPoints(): Observable<Point[]> {
    return this.missionDataService
      .getMissionTargetPoints()
      .pipe(tap((value) => this.targetPointsSubj.next(value)));
  }
}
