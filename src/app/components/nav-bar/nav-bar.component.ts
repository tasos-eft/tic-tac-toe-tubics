import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  show: boolean;
  squeeze: boolean;
  spring: boolean;

  constructor() { }

  ngOnInit() {
    this.show = false;
    this.squeeze = false;
    this.spring = false;
  }

  toggleSpring() {
    this.show = !this.show;
    this.spring = !this.spring;
  }

  toggleSqueeze() {
    this.squeeze = !this.squeeze;
    this.show = !this.show;
  }

}
