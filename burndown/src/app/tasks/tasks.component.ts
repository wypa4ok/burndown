import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Task } from '../model/Task';
import { TaskDataService } from '../services/task-data.service';
import { Mode } from '../model/Mode';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
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

  updateSprint() {
    this.taskDataService.updateSprint(this.tasks);
  }

  createSprint() {
    this.taskDataService.createSprint(this.tasks);
    this.mode = Mode.Active;
  }
}
