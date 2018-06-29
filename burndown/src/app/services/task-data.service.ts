import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { DataPoint } from '../model/DataPoint';
import { Sprint, SprintBuilder } from '../model/Sprint';
import { Task } from '../model/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {
  private sprint : Sprint;
  updatedDataPoints: BehaviorSubject<Array<DataPoint>> = new BehaviorSubject([]);

  public loadSprint() : Array<DataPoint> {
    return this.sprint.dataPoints;
  }

  public updateSprint(tasks: Array<Task>) {
    this.sprint.update(tasks);

    this.updatedDataPoints.next(this.sprint.dataPoints);
  }

  public createSprint(tasks: Array<Task>) {
    this.sprint = new SprintBuilder().withName("Test")
    .withStartDate(new Date())
    .withEndDate(new Date())
    .withLength(10)
    .withTasks(tasks)
    .build();

    this.updatedDataPoints.next(this.sprint.dataPoints);
  }

  constructor() { }
}
