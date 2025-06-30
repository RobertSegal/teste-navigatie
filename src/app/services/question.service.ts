import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  public get http(): HttpClient {
    return this._http;
  }
  public set http(value: HttpClient) {
    this._http = value;
  }
  constructor(private _http: HttpClient) {}

  getQuestions(): Observable<any> {
    return this.http.get('assets/jsonExamenNavigatie.json');
  }
}