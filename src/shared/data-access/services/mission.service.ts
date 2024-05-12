import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Coordinate } from '../models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  constructor(private localStorageService: LocalStorageService) {}

  getMissionTargetPoints(): Observable<Coordinate[]> {
    return of(this.localStorageService.getMissionTargetPoints());
  }

  addMissionTargetPoint(point: Coordinate) {
    return of(this.localStorageService.addMissionTargetPoint(point));
  }

  deleteAllMissionTargetPoints() {
    return of(this.localStorageService.deleteAllMissionTargetPoints());
  }
}
