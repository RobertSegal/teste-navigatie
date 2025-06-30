import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';

import {MatTableModule} from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    MatGridListModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './create-exam.component.html',
  styleUrl: './create-exam.component.css'
})
export class CreateExamComponent  implements OnInit {
  data: any[] = [];
  examenForm!: FormGroup;
  selectedExamen: string = '';
  selectedCategori: any[] = [];
  displayedColumns: string[] = ['position', 'name'];
  

  constructor(private questionService: QuestionService, private fb: FormBuilder, private router: Router) {  }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(res => {
      this.data = res;
    });

    this.examenForm = this.fb.group({
      examen: [null, Validators.required]
    });
    this.examenForm.addControl('minimumCorrect', this.fb.control(1, [Validators.required, Validators.min(1)]));
  }

  onExamenChange(): void {
    const found = this.data.find(d => d.examen === this.selectedExamen);
    this.selectedCategori = found ? found.categori : [];

      console.log(this.selectedExamen);
    // curăță disciplinele anterioare
    Object.keys(this.examenForm.controls).forEach(key => {
      if (key !== 'examen') this.examenForm.removeControl(key);
    });

    // adaugă câte un control pentru fiecare disciplină
    for (let cat of this.selectedCategori) {
      console.log(cat);
      this.examenForm.addControl(
        cat.disciplina,
        this.fb.control(1, [
          Validators.required,
          Validators.min(1),
          Validators.max(cat.intrebari.length)
        ])
      );
    }

    this.examenForm.addControl('minimumCorrect', this.fb.control(1, [Validators.required, Validators.min(1)]));
  }

  getMaxQuestions(disciplina: any): number {
    return disciplina.intrebari.length;
  }

  clickButton(){
    console.log(this.selectedExamen);
    console.log(this.selectedCategori);
  }

    submit(): void {
      const examen = this.examenForm.value.examen;
  const selected = this.data.find(x => x.examen === examen);
  const result: any[] = [];

  for (let cat of selected.categori) {
    const count = this.examenForm.value[cat.disciplina];

    const shuffledQuestions = [...cat.intrebari]
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .map(q => this.shuffleAnswers(q)); // 🟢 aici amesteci răspunsurile

    result.push({
      disciplina: cat.disciplina,
      intrebari: shuffledQuestions
    });
  }

  console.log({ 
      state: { 
        examen, 
        intrebari: result,
        minimumCorrect: this.examenForm.value.minimumCorrect 
      } 
    });
  this.router.navigateByUrl('/exam', 
    { 
      state: { 
        examen, 
        intrebari: result,
        minimumCorrect: this.examenForm.value.minimumCorrect 
      } 
    }
  );
  }

  shuffleAnswers(question: any): any {
    const originalAnswers = question.raspunsuri;
    const correctIndex = question.correctAnswer;

    const paired = originalAnswers.map((r: string, i: number) => ({
      text: r,
      isCorrect: i === correctIndex
    }));

    // shuffle
    const shuffled = paired.sort(() => Math.random() - 0.5);

    return {
      ...question,
      raspunsuri: shuffled.map((a: { text: any; }) => a.text),
      correctAnswer: shuffled.findIndex((a: { isCorrect: boolean; }) => a.isCorrect)
    };
  }
}
