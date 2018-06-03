import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DataPoint } from './DataPoint';
import { Task } from './Task';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {
  public NUMBER_OF_DAYS = 10;
  private dataPoints: Array<DataPoint> = [];
  updatedDataPoints: BehaviorSubject<Array<DataPoint>> = new BehaviorSubject([]);

  public updateDataToDraw(tasks: Array<Task>) {
    this.initData();
    const totalTask: Task = tasks.reduce((accumulator, currentValue) => {
      return {
        name: null,
        originalEstimate: accumulator.originalEstimate + currentValue.originalEstimate,
        remainingEstimate: accumulator.remainingEstimate + currentValue.remainingEstimate
      }
    });
    const totalOriginal = totalTask.originalEstimate;
    const totalRemaining = totalTask.remainingEstimate;
    const idealPerDay = totalOriginal / this.NUMBER_OF_DAYS;
    

    const newDataPoints: Array<DataPoint> = this.dataPoints.map((value, index) => {
      return {
        ...value,
        originalValue: totalOriginal - (idealPerDay * index)
      }
    });

    newDataPoints.find(el => (el.remainingValue == -1)).remainingValue = totalRemaining;

    this.dataPoints = newDataPoints;
    this.updatedDataPoints.next(newDataPoints);
  }

  private initData() {
    if (this.dataPoints.length == 0) {
      for (let i = 1; i <= this.NUMBER_OF_DAYS + 1; i++) {
        this.dataPoints.push({
          index: i,
          originalValue: -1,
          remainingValue: -1
        });
      }
    }
  }

  public getData() : Array<DataPoint> {
    return this.dataPoints;
  }

  constructor() { }
}
