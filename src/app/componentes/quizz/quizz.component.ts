import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TimeSocker } from './time';
import { TimesserviceService } from 'src/app/timesservice.service';


@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  listaTimes: TimeSocker[] = [];
  opcoes: string[] = [];
  totalTimes: number = 0;
  timeTela: TimeSocker = new TimeSocker();
  pontuacao: number = 0;
  acertos: number = 0;
  indiceAtual: number = 0; // Adiciona um índice para rastrear o item atual

  constructor(private http: HttpClient, private service: TimesserviceService) {}

  ngOnInit(): void {
    this.service.getTimes().subscribe((response) => {
      this.listaTimes = response;
      this.contarTotalTimes();

      if (this.listaTimes.length > 0) {
        this.atualizarTimeTela();
        this.gerarOpcoes();
      } else {
        console.warn("A lista de times está vazia.");
      }
    });
  }

  // Define o timeTela com o time atual da lista usando o índice
  atualizarTimeTela(): void {
    this.timeTela = this.listaTimes[this.indiceAtual];
  }

  // Conta o total de times
  contarTotalTimes(): void {
    this.totalTimes = this.listaTimes.length;
  }

  // Gera opções para o time atual
  gerarOpcoes(): void {
    if (!this.timeTela || !this.timeTela.nome) return;

    const nomeTimeAtual = this.timeTela.nome;

    const nomesDosTimes = this.listaTimes
      .map((time) => time.nome)
      .filter((nome) => nome !== nomeTimeAtual);

    this.opcoes = this.shuffleArray(nomesDosTimes).slice(0, 3);
    this.opcoes.push(nomeTimeAtual);
    this.opcoes = this.shuffleArray(this.opcoes);
  }

  // Embaralha um array
  private shuffleArray(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }

  // Lida com o clique nas opções e passa para o próximo time
  onOpcaoClick(nome: string): void {
    if (this.timeTela.nome === nome) {
      this.pontuacao += 10;
      this.acertos += 1;
    } else {
      this.pontuacao -= 10;
    }

    // Move para o próximo time
    this.proximoTime();
  }

  // Método para atualizar o timeTela para o próximo item na lista
  proximoTime(): void {
    this.indiceAtual++;
    if (this.indiceAtual < this.listaTimes.length) {
      this.atualizarTimeTela();
      this.gerarOpcoes();
    } else {
      alert("Fim da lista de times.");
      // Aqui, você pode exibir uma mensagem ou reiniciar o quiz, se desejar
    }
  }
}
