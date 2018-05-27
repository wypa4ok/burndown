import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DataPoint } from './DataPoint';
import { Task } from './Task';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {
  private NUMBER_OF_DAYS = 7;
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
      for (let i = 0; i < this.NUMBER_OF_DAYS; i++) {
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
    // const dataPoints: Array<DataPoint> = [];

    // dataPoints.push({index: 1, originalValue: 20, remainingValue: 20});
    // dataPoints.push({index: 2, originalValue: 17, remainingValue: 19});
    // dataPoints.push({index: 3, originalValue: 14, remainingValue: 15});
    // dataPoints.push({index: 4, originalValue: 11, remainingValue: 10});
    // dataPoints.push({index: 5, originalValue: 8, remainingValue: 11});
    // dataPoints.push({index: 6, originalValue: 5, remainingValue: 9});
    // dataPoints.push({index: 7, originalValue: 2, remainingValue: 5});
    // dataPoints.push({index: 8, originalValue: 0, remainingValue: 2});

    // return dataPoints;
  }

  constructor() { }
}
