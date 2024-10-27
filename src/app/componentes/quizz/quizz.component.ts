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
  totalErros: number = 0;
  indiceAtual: number = 0;
  exibirModal: boolean = false;// Controla a visibilidade do modal
  exibirModal2: boolean = false;
  contador: number = 0;

  constructor(private service: TimesserviceService) {}

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

  atualizarTimeTela(): void {
    this.timeTela = this.listaTimes[this.indiceAtual];
  }

  contarTotalTimes(): void {
    this.totalTimes = this.listaTimes.length;
  }

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

  private shuffleArray(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }

  onOpcaoClick(nome: string): void {
    if (this.timeTela.nome === nome) {
      this.pontuacao += 10;
      this.acertos += 1;
      this.contador +=1;
    } else {
      this.pontuacao -= 10;
      this.totalErros += 1;
      this.contador += 1;
    }

    // Exibe o modal e o fecha após 1,5 segundos
    this.exibirModal = true;
    setTimeout(() => {
      this.exibirModal = false;
      this.proximoTime(); // Move para o próximo time após fechar o modal
    }, 1500);
  }

  proximoTime(): void {
    this.indiceAtual++;
    if (this.indiceAtual < this.listaTimes.length) {
      this.atualizarTimeTela();
      this.gerarOpcoes();
    } else {
      this.exibirModal2 = true;

    // Move para o próximo time após fechar o modal
    }

  }


  // Reinicia o jogo ao estado inicial
  reiniciarJogo(): void {
    this.pontuacao = 0;
    this.acertos = 0;
    this.totalErros = 0;
    this.indiceAtual = 0;
    this.contador = 0;
    this.exibirModal = false;
    this.exibirModal2 = false;
    this.atualizarTimeTela();
    this.gerarOpcoes();
  }
}
