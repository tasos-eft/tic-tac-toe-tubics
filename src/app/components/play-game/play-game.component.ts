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
  moves: number;
  p0h: boolean;
  p3h: boolean;
  p6h: boolean;
  p0v: boolean;
  p1v: boolean;
  p2v: boolean;
  p0d: boolean;
  p6d: boolean;

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
    /* players' moves counter */
    this.moves = 0;
    /* ng class winning patterns */
    this.p0h = false;
    this.p3h = false;
    this.p6h = false;
    this.p0v = false;
    this.p1v = false;
    this.p2v = false;
    this.p0d = false;
    this.p6d = false;
  }

  play(position) {
    this.firstTurn = !this.firstTurn;
    console.log('position', position);
    /* first player plays, else second player plays */
    if (this.firstTurn) {
      this.firstPlayed[position] = true;
      if (this.moves > 5) {
        this.checkWinner(this.firstPlayed[position]);
      }
    } else {
      this.secondPlayed[position] = true;
      if (this.moves > 5) {
        this.checkWinner(this.secondPlayed[position]);
      }
    }
    console.log('first played', this.firstPlayed[position]);
    console.log('second played', this.secondPlayed[position]);
    this.moves++;
  }

  /* compares player moves against winning patterns */
  private checkWinner(playerMoves) {
    /*
    * p0h: h0 h1 h2 on 0
    * p3h: h3 h4 h5 on 3
    * p6h: h6 h7 h8 on 6
    * p0v: v0 v3 v6 on 0
    * p1v: v1 v4 v7 on 1
    * p2v: v2 v5 v8 on 2
    * p0d: d0 d4 d8 on 0
    * p6d: d2 d4 d6 on 6
    */
    const winningPatterns = [
      { name: 'p0h', pattern: [true, true, true, 'null', 'null', 'null', 'null', 'null', 'null'] },
      { name: 'p3h', pattern: ['null', 'null', 'null', true, true, true, 'null', 'null', 'null'] },
      { name: 'p6h', pattern: ['null', 'null', 'null', 'null', 'null', 'null', true, true, true] },
      { name: 'p0v', pattern: [true, 'null', 'null', true, 'null', 'null', true, 'null', 'null'] },
      { name: 'p1v', pattern: ['null', true, 'null', 'null', true, 'null', 'null', true, 'null'] },
      { name: 'p2v', pattern: ['null', 'null', true, 'null', 'null', true, 'null', 'null', true] },
      { name: 'p0d', pattern: [true, 'null', 'null', 'null', true, 'null', 'null', 'null', true] },
      { name: 'p6d', pattern: ['null', 'null', true, 'null', true, 'null', true, 'null', 'null'] }
    ];
    /*                           0      1       2       3        4       5       6      7       8 */

    for (let j = 0; j < 8; j++) {
      for (let i = 0; i < 9; i++) {
        if (winningPatterns[j].pattern[i] === true && playerMoves[i] === true) {
          console.log('hit', winningPatterns[j]);
        }
      }
    }
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
