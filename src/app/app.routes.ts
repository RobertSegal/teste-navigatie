import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamComponent } from './components/exam/exam.component'; 
import { CreateExamComponent } from './components/create-exam/create-exam.component';

export const routes: Routes = [
  { path: 'exam', component: ExamComponent },
  { path: 'create', component: CreateExamComponent },
  { path: '', redirectTo: 'create', pathMatch: 'full' }
];