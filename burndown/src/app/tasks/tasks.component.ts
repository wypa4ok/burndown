import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Task } from '../Task';
import { TaskDataService } from '../task-data.service';
import { Mode } from '../Mode';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  private mode: Mode = Mode.Estimation;
  private tasks: Array<Task> = [];
  private newTask: Task = {
    name: null,
    originalEstimate: null,
    remainingEstimate: null
  };

  constructor (private route: ActivatedRoute, private taskDataService: TaskDataService) { }

  ngOnInit() { 
    this.mode = Mode.Estimation;
  }

  addTask() {
    this.tasks.push(this.newTask);
    this.newTask = {
      name: null,
      originalEstimate: null,
      remainingEstimate: null
    };
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  draw() {
    this.taskDataService.updateDataToDraw(this.tasks);
  }

  startSprint() {
    this.mode = Mode.Active;
    this.draw();
  }
}
