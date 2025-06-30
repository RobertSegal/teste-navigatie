import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateExamComponent } from './components/create-exam/create-exam.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreateExamComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'teste-navigatie';
}
