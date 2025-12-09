import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './task-add.html',
})
export class TaskAddComponent {
  title = '';
  description = '';

  constructor(private taskService: TaskService, private router: Router) { }

  save(): void {
    if (!this.title.trim()) {
      return;
    }

    this.taskService.addTask({
      title: this.title,
      description: this.description,
    });

    this.router.navigate(['/']);
  }
}
