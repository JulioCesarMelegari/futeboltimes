import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TimesserviceService } from 'src/app/timesservice.service';
import { TimeSocker } from '../quizz/time';

@Component({
  selector: 'app-resposta',
  templateUrl: './resposta.component.html',
  styleUrls: ['./resposta.component.css'],
})
export class RespostaComponent implements OnInit {
  @Input() idParam!: number;

  timeTela: TimeSocker | undefined= {
    "id":1,
    "nome": "Fortaleza",
    "escudoPergunta":"assets/imagens/02.png",
    "escudoResposta":"assets/imagens/01.png"
    }

  constructor(
    private service: TimesserviceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.timeTela = new TimeSocker();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe((urlParams) => {
      this.idParam = urlParams['id'];
      if (this.idParam) {
        this.service.getTimeById(this.idParam).subscribe(response=> {
          this.timeTela = response;
          setTimeout(() => {
            this.router.navigate(['/quizz']);
          }, 700);
        },
        (errorResponse) => {
          console.log("Time não encontrado.");
        });
      }
    });
  }
}
