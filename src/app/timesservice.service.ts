import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeSocker } from './componentes/quizz/time';

@Injectable({
  providedIn: 'root',
})
export class TimesserviceService {
  constructor(private http: HttpClient) {}

  getTimes(): Observable<TimeSocker[]> {
    return this.http.get<TimeSocker[]>('assets/data/quizz_questions.json');
  }
}
