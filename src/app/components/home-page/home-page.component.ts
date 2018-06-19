import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStoreService } from '../../services/data-store.service';
import { Player } from '../../player';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  firstPlayer: Player;
  secondPlayer: Player;
  players: Player[];
  findPlayers: boolean;

  constructor(
    private router: Router,
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit() {
    this.findPlayers = false;
    this.checkPlayers();
  }

  newPlayers() {
    this.router.navigate(['/enter-players']);
  }

  existingPlayers() {
    if (this.players !== null && this.players.length > 1) {
      this.router.navigate(['/play-game']);
    }
  }

  checkPlayers() {
    this.players = this.retrievePlayers();
    if (this.players === null) {
      this.findPlayers = false;
      // this.router.navigate(['/enter-players']);
    } else {
      this.findPlayers = true;
      /* store first and second player */
      this.firstPlayer = this.players[0];
      this.secondPlayer = this.players[1];
    }
  }

  private retrievePlayers() {
    let storedPlayers = null;
    if (this.testLocalStorage()) {
      storedPlayers = JSON.parse(localStorage.getItem('players'));
    } else {
      storedPlayers = this.dataStoreService.pullData().players;
    }
    return storedPlayers;
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
