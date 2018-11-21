import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pp-content',
  template: `
    <router-outlet></router-outlet>
  `
})
export class ContentComponent implements OnInit {

  constructor( private route: ActivatedRoute ) {}

  // public accessors and mutators
  editContent() {
    console.log('Edit content!');
  }

  // event handling methods
  ngOnInit() {
    console.log( this.route.component );
  }
}
