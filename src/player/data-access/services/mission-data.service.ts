import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MissionDataService {
  getMissionTargetPoints() {
    return of([
      { x: 80, y: 20 },
      { x: 600, y: 20 },
      { x: 600, y: 300 },
      { x: 80, y: 300 },
    ]);
  }
}
