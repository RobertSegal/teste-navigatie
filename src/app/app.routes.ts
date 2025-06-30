import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamComponent } from './components/exam/exam.component'; 
import { CreateExamComponent } from './components/create-exam/create-exam.component';
import { ResultsComponent } from './components/results/results.component';

export const routes: Routes = [
  { path: 'exam', component: ExamComponent },
  { path: 'create', component: CreateExamComponent },
  { path: 'results', component: ResultsComponent },
  { path: '', redirectTo: 'create', pathMatch: 'full' }
];