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
  player: string;

  constructor(
    private router: Router,
    private nodeApiService: NodeApiService,
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit() {
  }

  createPlayer() {
    const url = '/players/create-player/';
    const data = { players: this.getPlayers() };
    this.nodeApiService
      .postData(url, data)
      .then(players => {
        console.log(players);
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
        console.log(players);
        this.players = allPlayers;
      })
      .catch(error => {
        this.router.navigate(['/']);
      });
  }

  private getPlayers() {
    let players = null;
    if (this.testLocalStorage()) {
      players = localStorage.getItem('players');
    } else {
      players = this.dataStoreService.pullData().players;
    }
    return players;
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
