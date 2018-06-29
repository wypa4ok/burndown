import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { TaskDataService } from '../services/task-data.service';
import { DataPoint } from '../model/DataPoint';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  private original: Array<number> = [];
  private remaining: Array<number> = [];
   // lineChart
  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];

  private dataPoints: Observable<DataPoint[]>;

  constructor(private afs: AngularFirestore, private taskDataService: TaskDataService) { }

  ngOnInit() {
    this.updateValues();
    this.initLabels();
    this.taskDataService.updatedDataPoints.subscribe((data: Array<DataPoint>) => this.updateValues());
   }

   private updateValues() {
    this.original = this.taskDataService.loadSprint().map(data => data.originalValue);
    this.remaining = this.taskDataService.loadSprint()
                                        .filter(data => (moment(data.date) <= moment().startOf('day')))
                                        .map(data => data.remainingValue);
    
    this.lineChartData = [
      {data: this.original, label: 'Ideal'},
      {data: this.remaining, label: 'Real'},
    ];

  }

  private initLabels() {
    this.lineChartLabels = [];
    for (let i = 0; i <= 10; i++) {
      this.lineChartLabels.push('Day ' + i);
    }
  }
  public lineChartOptions:any = {
    responsive: true
  };
    public lineChartColors:Array<any> = [
      { // grey
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // dark grey
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
      },
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';

}
