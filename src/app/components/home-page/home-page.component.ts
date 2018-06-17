import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { slideUp } from '../../animations/slide-up';
import { NodeApiService } from '../../services/node-api.service';
import { DataStoreService } from '../../services/data-store.service';
import { Player } from '../../player';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  players: string;

  constructor(
    private router: Router,
    private nodeApiService: NodeApiService,
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit() {
  }

  newPlayer() {
    this.router.navigate(['/enter-players']);
  }

  createPlayer() {
    const url = '/players/create-player/';
    const data = { players: this.retrievePlayers() };
    this.nodeApiService
      .postData(url, data)
      .then(playerData => {
        console.log(playerData);
      })
      .catch(error => {
        this.router.navigate(['/']);
      });
  }

  getAllPlayers() {
    const url = '/players/read-player/';
    this.nodeApiService
      .getData(url)
      .then(allPlayers => {
        console.log(allPlayers);
        this.players = allPlayers;
      })
      .catch(error => {
        this.router.navigate(['/']);
      });
  }

  private retrievePlayers() {
    let storedPlayers = null;
    if (this.testLocalStorage()) {
      storedPlayers = localStorage.getItem('players');
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
