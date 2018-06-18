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
  firstTurn: boolean;
  cells: number[];
  firstPlayed: boolean[];
  secondPlayed: boolean[];

  constructor(
    private router: Router,
    private nodeApiService: NodeApiService,
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit() {
    /* retrieves players from localstorage or from memory */
    this.players = this.retrievePlayers();
    /* store first and second player */
    this.firstPlayer = this.players[0];
    this.secondPlayer = this.players[1];
    /* when true, first player plays */
    this.firstTurn = true;
    /* 3x3 grid */
    this.cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    /* first player's moves on each grid cell (0-8) */
    this.firstPlayed = [false, false, false, false, false, false, false, false, false];
    /* second player's moves on each grid cell (0-8) */
    this.secondPlayed = [false, false, false, false, false, false, false, false, false];
  }

  play(position) {
    this.firstTurn = !this.firstTurn;
    console.log('position', position);
    /* first player plays, else second player plays */
    if (this.firstTurn) {
      this.firstPlayed[position] = true;
    } else {
      this.secondPlayed[position] = true;
    }
    console.log('first played', this.firstPlayed[position]);
    console.log('second played', this.secondPlayed[position]);
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
