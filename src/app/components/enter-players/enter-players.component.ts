import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { slideUp } from '../../animations/slide-up';
import { NodeApiService } from '../../services/node-api.service';
import { DataStoreService } from '../../services/data-store.service';
import { Player } from '../../player';

@Component({
  selector: 'app-enter-players',
  templateUrl: './enter-players.component.html',
  styleUrls: ['./enter-players.component.scss']
})
export class EnterPlayersComponent implements OnInit {
  firstPlayer: string;
  secondPlayer: string;
  model: Player;
  submitted: boolean;

  constructor() { }

  ngOnInit() {
    this.submitted = false;
    this.model = new Player(1, 'Dr Who', null);
  }

  submitFirstPlayer() {
    console.log('\n first player ', this.firstPlayer, '\n second player ', this.secondPlayer);
  }

  submitSecondPlayer() {
    console.log('\n first player ', this.firstPlayer, '\n second player ', this.secondPlayer);
  }

  onSubmit() {
    this.submitted = true;
  }

}

