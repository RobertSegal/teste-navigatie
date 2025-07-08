import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuestionService {

  data: any[] | null = null;

  public get http(): HttpClient {
    return this._http;
  }
  public set http(value: HttpClient) {
    this._http = value;
  }

  constructor(private _http: HttpClient) {
    this.getQuestionsFromJson().subscribe(res => {
      this.data = res;
    });
  }

  getQuestions(){
    return this.data;
  }

  private getQuestionsFromJson(): Observable<any> {
    return this.http.get('assets/jsonExamenNavigatie.json');
  }

  generateExam(examData: any){
    var examen = examData.examen;

    const selected = this.data?.find(x => x.examen === examen);
    var result: any[] = [];
  
    for (let cat of selected.categori) {
      const count = examData[cat.disciplina];
  
      const shuffledQuestions = [...cat.intrebari]
        .sort(() => Math.random() - 0.5)
        .slice(0, count)
        .map(q => this.shuffleAnswers(q)); // 🟢 aici amesteci răspunsurile
  
      result.push({
        disciplina: cat.disciplina,
        intrebari: shuffledQuestions
      });
    }

    result = this.shuffleArray(result);

    return {
        examen, 
        intrebari: result,
        minimumCorrect: examData.minimumCorrect
    }
  }
  
  private shuffleAnswers(question: any): any {
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

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}