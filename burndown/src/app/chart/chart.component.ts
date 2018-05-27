import { Component, OnInit } from '@angular/core';
import { TaskDataService } from '../task-data.service';
import { DataPoint } from '../DataPoint';

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

  constructor(private taskDataService: TaskDataService) { }

  ngOnInit() {
    this.updateValues()
    this.taskDataService.updatedDataPoints.subscribe((data: Array<DataPoint>) => this.updateValues())
   }

   private updateValues() {
    this.original = this.taskDataService.getData().map(data => data.originalValue);
    this.remaining = this.taskDataService.getData()
                                        .filter(el => (el.remainingValue != -1))
                                        .map(data => data.remainingValue);
    this.lineChartData = [
      {data: this.original, label: 'Ideal'},
      {data: this.remaining, label: 'Real'},
    ];
    this.lineChartLabels = [1, 2, 3, 4, 5, 6, 7];
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
