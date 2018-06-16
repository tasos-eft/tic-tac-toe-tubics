import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes = [
  { path: '**', component: NotFoundComponent }
];

export const AppRouting = RouterModule.forRoot(routes);
