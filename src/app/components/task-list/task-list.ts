import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TaskItemComponent],
  templateUrl: './task-list.html',
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<Task[]>;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();
  }

  toggle(id: string): void {
    this.taskService.toggleComplete(id);
  }

  remove(id: string): void {
    this.taskService.deleteTask(id);
  }
}
