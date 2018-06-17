import { RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { EnterPlayersComponent } from './components/enter-players/enter-players.component';
import { PlayGameComponent } from './components/play-game/play-game.component';
import { ShowWinnerComponent } from './components/show-winner/show-winner.component';
import { ResultsComponent } from './components/results/results.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, data: { state: 'home' }  },
  { path: 'enter-players', component: EnterPlayersComponent, data: { state: 'enter-players' } },
  { path: 'play-game', component: PlayGameComponent, data: { state: 'play-game' } },
  { path: 'show-winner', component: ShowWinnerComponent, data: { state: 'show-winner' } },
  { path: 'display-results', component: ResultsComponent, data: { state: 'display-results' } },
  { path: '**', component: NotFoundComponent }
];

export const AppRouting = RouterModule.forRoot(routes);
