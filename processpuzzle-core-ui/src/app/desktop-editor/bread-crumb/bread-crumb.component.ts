import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'pp-bread-crumb',
  template: `
    <main>
    <nav>
      <div class="nav-wrapper">
        <div class="col s12">
          <a href="#!" class="breadcrumb">First</a>
          <a href="#!" class="breadcrumb">Second</a>
          <a href="#!" class="breadcrumb">Third</a>
        </div>
      </div>
    </nav>
    </main>
    `
})
export class BreadCrumbComponent implements OnInit {
  @Input() items: string[];

  constructor() { }

  ngOnInit() {
  }

}
