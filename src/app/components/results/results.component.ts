import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDividerModule }  from '@angular/material/divider';
import { MatCheckbox }  from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [MatDividerModule,MatCheckbox,FormsModule,CommonModule,MatButtonModule,MatCardModule ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  questions: any[] = [];
  showCorrect = false;
  minimumCorrect: any;
  correctCount!: number;
  passed!: boolean;
  lastInput: any;

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state as any;
    if (!state?.questions) {
      this.router.navigateByUrl('/');
      return;
    }

    this.lastInput = state.lastInput;

    this.questions = [...state.questions];

    // sortăm: greșite mai întâi
    this.questions.sort((a, b) => {
      const aWrong = a.selectedAnswer !== a.correctAnswer;
      const bWrong = b.selectedAnswer !== b.correctAnswer;
      return Number(bWrong) - Number(aWrong);
    });

    this.minimumCorrect = state.lastInput.minimumCorrect || 1;

    this.correctCount = this.questions.filter(q => q.selectedAnswer === q.correctAnswer).length;
    this.passed = this.correctCount >= this.minimumCorrect;
  }

  retake(): void {
    this.router.navigateByUrl('/exam', {
      state: {
        examForm: this.lastInput
        }
      });
  }

  recreate(): void {
    this.router.navigateByUrl('/create');
  }
}