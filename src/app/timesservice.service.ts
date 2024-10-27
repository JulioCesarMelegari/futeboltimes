import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TimeSocker } from './componentes/quizz/time';

@Injectable({
  providedIn: 'root',
})
export class TimesserviceService {
  constructor(private http: HttpClient) {}

  getTimes(): Observable<TimeSocker[]> {
    return this.http.get<TimeSocker[]>('assets/data/quizz_questions.json');
  }

  getTimeById(id: number): Observable<TimeSocker | undefined> {
    return this.getTimes().pipe(
      map(times => times.find(time => time.id === id))
    );
  }
}
