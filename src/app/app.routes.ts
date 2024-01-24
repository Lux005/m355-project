import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'task1',
    loadComponent: () => import('./task1/task1.page').then( m => m.Task1Page)
  },
  {
    path: 'task2',
    loadComponent: () => import('./task2/task2.page').then( m => m.Task2Page)
  },
  {
    path: 'task3',
    loadComponent: () => import('./task3/task3.page').then( m => m.Task3Page)
  },
  {
    path: 'task4',
    loadComponent: () => import('./task4/task4.page').then( m => m.Task4Page)
  },
];
