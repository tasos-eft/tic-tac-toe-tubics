import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EnterPlayersComponent } from './components/enter-players/enter-players.component';
import { PlayGameComponent } from './components/play-game/play-game.component';
import { ShowWinnerComponent } from './components/show-winner/show-winner.component';
import { ResultsComponent } from './components/results/results.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes = [
  { path: '', redirectTo: '/play', pathMatch: 'full' },
  { path: 'play', component: EnterPlayersComponent, data: { state: 'enter-players' } },
  { path: 'play', component: PlayGameComponent, data: { state: 'play-game' } },
  { path: 'play', component: ShowWinnerComponent, data: { state: 'show-winner' } },
  { path: 'results', component: ResultsComponent, data: { state: 'display-results' } },
  { path: '**', component: NotFoundComponent }
];

export const AppRouting = RouterModule.forRoot(routes);
