import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizzComponent } from './componentes/quizz/quizz.component';
import { RespostaComponent } from './componentes/resposta/resposta.component';

const routes: Routes = [
  {path: 'quizz', component:QuizzComponent},
  {path: 'resposta/:id', component:RespostaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
