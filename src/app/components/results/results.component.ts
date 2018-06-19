import { Component, OnInit } from '@angular/core';
import { NodeApiService } from '../../services/node-api.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  players: any;
  constructor(private nodeApiService: NodeApiService) { }

  ngOnInit() {
    this.getAllRecords();
  }

  getAllRecords() {
    this.nodeApiService.getData('/players/read-players/')
      .then(data => {
        console.log('data', data);
        this.players = data;
      })
      .catch(error => console.log('error', error));
  }
}
