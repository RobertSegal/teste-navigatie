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
  questions: any[] = [];
  currentIndex = 0;
  minimumCorrect: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as any;

    if (!state || !state.intrebari) {
      this.router.navigateByUrl('/');
      return;
    }
    this.minimumCorrect = state.minimumCorrect || 1;
    this.questions = state.intrebari.flatMap((d: any) =>
      d.intrebari.map((q: any) => ({
        ...q,
        selectedAnswer: null
      }))
    );
  }

  prev() {
    if (this.currentIndex > 0) this.currentIndex--;
  }

  next() {
    if (this.currentIndex < this.questions.length - 1) this.currentIndex++;
  }

  finalize() {
    this.router.navigateByUrl('/results', {
      state: {
        questions: this.questions,
        minimumCorrect: this.minimumCorrect
      }
    });
  }

  isIncomplete(): boolean {
    return this.questions.some(q => q.selectedAnswer === null);
  }
}
