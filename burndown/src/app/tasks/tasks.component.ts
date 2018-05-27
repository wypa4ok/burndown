import { Component, OnInit } from '@angular/core';
import { Task } from '../Task';
import { TaskDataService } from '../task-data.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  private tasks: Array<Task> = [];
  private newTask: Task = {
    name: null,
    originalEstimate: null,
    remainingEstimate: null
  };

  constructor (private taskDataService: TaskDataService) { }

  ngOnInit() { }

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
}
