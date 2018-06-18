import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NodeApiService } from '../../services/node-api.service';
import { DataStoreService } from '../../services/data-store.service';
import { Player } from '../../player';

@Component({
  selector: 'app-enter-players',
  templateUrl: './enter-players.component.html',
  styleUrls: ['./enter-players.component.scss']
})
export class EnterPlayersComponent implements OnInit {
  firstPlayer: Player;
  secondPlayer: Player;
  nameValidator: boolean;

  constructor(
    private router: Router,
    private nodeApiService: NodeApiService,
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit() {
    this.firstPlayer = new Player(null, null, null, false);
    this.secondPlayer = new Player(null, null, null, false);
    this.nameValidator = false;
  }

  submitPlayer(playerOne, playerTwo) {
    if (playerOne !== playerTwo) {
      /* store players' data locally and redirect to play */
      const p1 = new Player(playerOne, 1, 0, true);
      const p2 = new Player(playerTwo, 2, 0, true);
      if (this.testLocalStorage()) {
        localStorage.removeItem('players');
        localStorage.setItem('players', JSON.stringify([p1, p2]));
      } else {
        this.dataStoreService.pushData({ players: [p1, p2] });
      }
      this.router.navigate(['/play-game']);
    } else {
      this.secondPlayer.validator = false;
      this.nameValidator = true;
    }
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


