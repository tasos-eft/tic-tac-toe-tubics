import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { slideUp } from '../../animations/slide-up';
import { NodeApiService } from '../../services/node-api.service';
import { DataStoreService } from '../../services/data-store.service';
import { Player } from '../../player';
import { copyStyles } from '@angular/animations/browser/src/util';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.scss']
})
export class PlayGameComponent implements OnInit {
  firstPlayer: Player;
  secondPlayer: Player;
  players: Player[];
  /* when true, second player plays */
  turn: boolean;
  cells: number[];
  firstPlayed: boolean[];
  secondPlayed: boolean[];

  constructor(
    private router: Router,
    private nodeApiService: NodeApiService,
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit() {
    this.players = this.retrievePlayers();
    console.log('players', this.players);
    this.firstPlayer = this.players[0];
    this.secondPlayer = this.players[1];
    this.turn = false;
    this.cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.firstPlayed = [true, false, true, false, false, false, false, false, false];
    this.secondPlayed = [false, true, false, false, false, false, false, false, false];
  }

  play(position) {
    this.turn = !this.turn;
    console.log('position', position);
  }

  private retrievePlayers() {
    let players = null;
    if (this.testLocalStorage()) {
      players = localStorage.getItem('players');
    } else {
      players = this.dataStoreService.pullData().players;
    }
    return players;
  }
  /*
   * local storage check
   */
  private testLocalStorage() {
    try {
      localStorage.setItem('mod', 'mod');
      localStorage.removeItem('mod');
      return true;
    } catch (e) {
      console.log('does not supports local storage');
      return false;
    }
  }
}
