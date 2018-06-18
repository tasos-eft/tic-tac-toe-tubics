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

  constructor(
    private router: Router,
    private nodeApiService: NodeApiService,
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit() {
    this.firstPlayer = new Player(null, null, null, false);
    this.secondPlayer = new Player(null, null, null, false);
  }

  submitPlayer(name, turn) {
    const readUrl = '/players/find-player/';
    const readData = { name: name };

    const createdPlayer = new Player( name, turn, 0, true);
    const createUrl = '/players/create-player/';
    const createData = JSON.stringify(createdPlayer);
    console.log('createData', createData);
    /* check if player name already exists */
    this.nodeApiService.postData(readUrl, readData)
      .then(player => {
        console.log('player', player);
        let response = null;
        if (player) {
          response = player;
        } else {
          console.log('createData', createData);
          response = this.nodeApiService.postData(createUrl, createdPlayer);
        }
        return response;
      })
      .then(response => {
        console.log('response', response);
      })
      .catch(error => {
        console.log('error', error);
      });
  }
}


