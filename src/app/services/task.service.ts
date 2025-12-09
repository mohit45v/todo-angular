import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

const STORAGE_KEY = 'tasks_manager_tasks_v1';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks$ = new BehaviorSubject<Task[]>(this.loadFromStorage());

    getTasks(): Observable<Task[]> {
        return this.tasks$.asObservable();
    }

    addTask(task: Partial<Task>): void {
        const current = this.tasks$.getValue();
        const newTask: Task = {
            id: Date.now().toString(),
            title: (task.title || '').trim(),
            description: task.description || '',
            completed: false,
            createdAt: Date.now(),
        };
        const updated = [newTask, ...current];
        this.tasks$.next(updated);
        this.saveToStorage(updated);
    }

    toggleComplete(id: string): void {
        const updated = this.tasks$.getValue().map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        );
        this.tasks$.next(updated);
        this.saveToStorage(updated);
    }

    deleteTask(id: string): void {
        const updated = this.tasks$.getValue().filter(t => t.id !== id);
        this.tasks$.next(updated);
        this.saveToStorage(updated);
    }

    private loadFromStorage(): Task[] {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    }

    private saveToStorage(tasks: Task[]): void {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        } catch {
            // ignore
        }
    }
}
