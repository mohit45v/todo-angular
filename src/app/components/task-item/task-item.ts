import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.html',
})
export class TaskItemComponent {
  @Input() task!: Task;          // '!' = tell TS it will be defined
  @Output() toggle = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onToggle(): void {
    this.toggle.emit();
  }

  onDelete(): void {
    this.delete.emit();
  }
}
