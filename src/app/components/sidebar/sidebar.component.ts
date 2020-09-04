import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  scrollTop: number;
  toggled = true;
  collapse = false;

  constructor() { }

  ngOnInit(): void {

    if ( window.innerWidth < 768) {
      this.toggled = true;
    }
  }

}

