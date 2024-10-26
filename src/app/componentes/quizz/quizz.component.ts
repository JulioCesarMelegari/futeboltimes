import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { time } from './time';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  listaTimes: time[]= [];

  opcoes = ['Santos', 'Flamengo', 'São Paulo', 'Fortaleza'];

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.http.get<any[]>('assets/data/quizz_questions.json').subscribe((response) =>{
      this.listaTimes=response;
    })
  }
}
