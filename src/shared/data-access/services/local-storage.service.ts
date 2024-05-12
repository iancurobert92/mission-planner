import { Injectable } from '@angular/core';
import { Coordinate } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private TARGET_POINTS_KEY: string = 'targetPoints';

  getMissionTargetPoints(): Coordinate[] {
    const targetPointsString = localStorage.getItem(this.TARGET_POINTS_KEY);
    const targetPoints: Coordinate[] = targetPointsString
      ? JSON.parse(targetPointsString)
      : [];
    return targetPoints;
  }

  addMissionTargetPoint(point: Coordinate) {
    const targetPoints = this.getMissionTargetPoints();
    targetPoints.push(point);
    localStorage.setItem(this.TARGET_POINTS_KEY, JSON.stringify(targetPoints));

    return targetPoints;
  }

  deleteAllMissionTargetPoints() {
    localStorage.removeItem(this.TARGET_POINTS_KEY);
    return this.getMissionTargetPoints();
  }
}
