import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list';
import { TaskAddComponent } from './components/task-add/task-add';

export const routes: Routes = [
    { path: '', component: TaskListComponent },
    { path: 'add', component: TaskAddComponent },
];
