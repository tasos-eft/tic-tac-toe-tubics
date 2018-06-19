import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

import { NodeApiService } from './services/node-api.service';
import { DataStoreService } from './services/data-store.service';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { EnterPlayersComponent } from './components/enter-players/enter-players.component';
import { PlayGameComponent } from './components/play-game/play-game.component';
import { ResultsComponent } from './components/results/results.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,
    EnterPlayersComponent,
    PlayGameComponent,
    ResultsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRouting,
    BrowserAnimationsModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [NodeApiService, DataStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
