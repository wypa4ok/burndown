import * as moment from 'moment';

import { DataPoint } from "./DataPoint";
import { Task } from "./Task";

export class Sprint {

     name: string;
     start: Date;
     end: Date;
     length: number;
     tasks: Array<Task>
     dataPoints: Array<DataPoint>;

    constructor() { }

    public update(tasks: Array<Task>) {
        this.tasks = tasks.concat();
        const originalValues = this.getOriginalEstimateValues(tasks);
        const remainingValue = this.getRemainingValue(tasks);
        this.dataPoints.map((dataPoint, index) => {
          dataPoint.originalValue = originalValues[index];
          if (moment(dataPoint.date).format('LL') == moment().format('LL')) {
            dataPoint.remainingValue = remainingValue;
          }
        });
      }

    public initialize() {
        this.dataPoints = [];
        const originalValues = this.getOriginalEstimateValues(this.tasks);
        for (let i = 0; i <= this.length; i++) {
          this.dataPoints.push({
            date: moment().startOf('day').add(i, 'days').format('LL'),
            originalValue: originalValues[i],
            remainingValue: originalValues[i]
          });
        }
      }

    private getOriginalEstimateValues(tasks: Array<Task>): Array<number> {
        const values = [];
        const totalTask: Task = tasks.reduce((accumulator, currentValue) => {
          return {
            name: null,
            originalEstimate: accumulator.originalEstimate + currentValue.originalEstimate,
            remainingEstimate: accumulator.remainingEstimate + currentValue.remainingEstimate
          }
        });
        const totalOriginal = totalTask.originalEstimate;
        const totalRemaining = totalTask.remainingEstimate;
        const idealPerDay = totalOriginal / this.length;
        for (let i = 0; i <= this.length; i++) {
          values.push(totalOriginal - (idealPerDay * i));
        }
    
        return values;
      }

      private getRemainingValue(tasks: Array<Task>): number {
        const totalTask: Task = tasks.reduce((accumulator, currentValue) => {
          return {
            name: null,
            originalEstimate: accumulator.originalEstimate + currentValue.originalEstimate,
            remainingEstimate: accumulator.remainingEstimate + currentValue.remainingEstimate
          }
        });
    
        return totalTask.remainingEstimate;
      }
}

export class SprintBuilder {
    private sprint = new Sprint();

    public withName(name: string): SprintBuilder {
        this.sprint.name = name;
        return this;
    }

    public withStartDate(start: Date): SprintBuilder {
        this.sprint.start = start;
        return this;
    }

    public withEndDate(end: Date): SprintBuilder {
        this.sprint.end = end;
        return this;
    }

    public withLength(length: number): SprintBuilder {
        this.sprint.length = length;
        return this;
    }

    public withTasks(tasks: Array<Task>): SprintBuilder {
        // deep copy of an input array
        this.sprint.tasks = tasks.concat();
        return this;
    }

    public build(): Sprint {
        this.sprint.initialize();
        return this.sprint;
    }
}