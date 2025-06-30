import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';

import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-create-exam',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    CommonModule],
  templateUrl: './create-exam.component.html',
  styleUrl: './create-exam.component.css'
})
export class CreateExamComponent  implements OnInit {
  data: any[] = [];
  selectedExamen: string = '';
  selectedCategori: any[] = [];
  displayedColumns: string[] = ['position', 'name'];

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(res => {
      console.log(res);
      this.data = res;
    });
  }

  onExamenChange(): void {
    const found = this.data.find(d => d.examen === this.selectedExamen);
    this.selectedCategori = found ? found.categori : [];
  }

  getMaxQuestions(disciplina: any): number {
    return disciplina.intrebari.length;
  }

}
