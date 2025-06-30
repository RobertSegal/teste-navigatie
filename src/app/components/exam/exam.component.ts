import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule, MatButtonModule, FormsModule]
})
export class ExamComponent {
  examTitle = '';
  allQuestions: any[] = [];
  answers: number[] = [];

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as any;

    if (!state || !state.intrebari) {
      this.router.navigateByUrl('/');
      return;
    }

    this.examTitle = state.examen;

    // unificăm toate întrebările într-un singur array
    this.allQuestions = state.intrebari.flatMap((d: any) => d.intrebari);
    this.answers = new Array(this.allQuestions.length).fill(null);
  }

  submitExam(): void {
    let correct = 0;
    this.allQuestions.forEach((q, i) => {
      if (q.correctAnswer === this.answers[i]) correct++;
    });

    const passed = (correct / this.allQuestions.length) >= 0.7;

    alert(`Ai răspuns corect la ${correct} din ${this.allQuestions.length}. ${passed ? 'Ai trecut!' : 'Ai picat.'}`);
  }
}
