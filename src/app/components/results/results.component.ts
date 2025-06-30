import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDividerModule }  from '@angular/material/divider';
import { MatCheckbox }  from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [MatDividerModule,MatCheckbox,FormsModule,CommonModule ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  questions: any[] = [];
  showCorrect = false;
  minimumCorrect: any;
  correctCount!: number;
  passed!: boolean;

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state as any;
    if (!state?.questions) {
      this.router.navigateByUrl('/');
      return;
    }

    this.questions = [...state.questions];

    // sortăm: greșite mai întâi
    this.questions.sort((a, b) => {
      const aWrong = a.selectedAnswer !== a.correctAnswer;
      const bWrong = b.selectedAnswer !== b.correctAnswer;
      return Number(bWrong) - Number(aWrong);
    });

    this.minimumCorrect = state.minimumCorrect || 1;

    this.correctCount = this.questions.filter(q => q.selectedAnswer === q.correctAnswer).length;
    this.passed = this.correctCount >= this.minimumCorrect;
  }
}