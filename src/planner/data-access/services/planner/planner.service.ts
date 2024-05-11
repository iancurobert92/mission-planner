import { Injectable } from '@angular/core';
import { ArrayUtils } from '@planner/util';
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
    if (ArrayUtils.hasElement(value, this.coordinatesSubj.value, ['name']))
      return alert(`The entry with the name "${value.name}" already exists.`);

    if (ArrayUtils.hasElement(value, this.coordinatesSubj.value, ['x', 'y']))
      return alert('These coordonates already exists');

    this.coordinatesSubj.next([...this.coordinatesSubj.value, value]);
  }
}
