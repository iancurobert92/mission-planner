import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Coordinate } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  private coordinatesSubj = new BehaviorSubject<Coordinate[]>([]);

  get coordinates$(): Observable<Coordinate[]> {
    return this.coordinatesSubj.asObservable();
  }

  addCoordinate(value: Coordinate) {
    this.coordinatesSubj.next([...this.coordinatesSubj.value, value]);
  }
}
