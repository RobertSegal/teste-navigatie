import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule, MatButtonModule, MatProgressBarModule, FormsModule, MatCardModule]
})
export class ExamComponent {
  questions: any[] = [];
  currentIndex = 0;
  minimumCorrect: any;
  actualInput: any;

  constructor(private router: Router, questionService: QuestionService) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as any;

    if (!state || !state.examForm) {
      this.router.navigateByUrl('/');
      return;
    }

    this.actualInput = state.examForm;
    const exam = questionService.generateExam(this.actualInput);

    this.minimumCorrect = exam.minimumCorrect || 1;
    this.questions = exam.intrebari.flatMap((d: any) =>
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
        lastInput: this.actualInput,
        questions: this.questions
      }
    });
  }

  isIncomplete(): boolean {
    return this.questions.some(q => q.selectedAnswer === null);
  }

  responseProgress(): number{
    var answers = this.questions.find(f => f.selectedAnswer != null).length;
    return answers * 100 / this.questions.length;
    //raspunsuri * 100 / total
  }
}
