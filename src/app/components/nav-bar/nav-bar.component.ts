import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  displayed: boolean;
  spring: boolean;

  constructor() { }

  ngOnInit() {
    this.displayed = false;
    this.spring = false;
  }

  toggleSpring() {
    this.displayed = !this.displayed;
    this.spring = !this.spring;
  }

}
