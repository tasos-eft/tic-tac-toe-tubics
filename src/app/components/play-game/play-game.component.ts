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
    /* total moves */
    this.moves++;
    /* first player plays, else second player plays */
    if (this.firstTurn) {
      this.firstPlayed[position] = true;
      if (this.moves >= 5) {
        this.checkWinner(this.firstPlayed);
      }
    } else {
      this.secondPlayed[position] = true;
      if (this.moves >= 5) {
        this.checkWinner(this.secondPlayed);
      }
    }
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
    let combination = '';
    /* horizontal */
    if (playerMoves[0] === true && playerMoves[1] === true && playerMoves[2] === true) {
      combination = 'p0h';
      this.p0h = true;
    }
    if (playerMoves[3] === true && playerMoves[4] === true && playerMoves[5] === true) {
      combination = 'p3h';
      this.p3h = true;
    }
    if (playerMoves[6] === true && playerMoves[7] === true && playerMoves[8] === true) {
      combination = 'p6h';
      this.p6h = true;
    }

    /* vertical */
    if (playerMoves[0] === true && playerMoves[3] === true && playerMoves[6] === true) {
      combination = 'p0v';
      this.p0v = true;
    }
    if (playerMoves[1] === true && playerMoves[4] === true && playerMoves[7] === true) {
      combination = 'p1v';
      this.p1v = true;
    }
    if (playerMoves[2] === true && playerMoves[5] === true && playerMoves[8] === true) {
      combination = 'p2v';
      this.p2v = true;
    }

    /* diagonal */
    if (playerMoves[0] === true && playerMoves[4] === true && playerMoves[8] === true) {
      combination = 'p0d';
      this.p0d = true;
    }
    if (playerMoves[2] === true && playerMoves[4] === true && playerMoves[6] === true) {
      combination = 'p6d';
      this.p6d = true;
    }
    console.log('winning combination', combination);
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
