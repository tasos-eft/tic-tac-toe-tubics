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

  model = new Player(1, 'Dr Who', null);

  submitted = false;

  constructor() { }

  ngOnInit() {
  }

  newPlayer() {
    this.model = new Hero(42, '', '');
    console.log(this.model);
  }

  onSubmit() { this.submitted = true; }

}
