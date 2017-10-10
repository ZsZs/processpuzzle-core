import {Component, OnInit, Input} from '@angular/core';
import {ContentReference} from './content-reference';
import { Desktop } from '../desktop';

@Component({
  selector: 'pp-navigation-bar',
  template: `
    <nav>
      <div class="nav-wrapper">
        <a class="brand-logo" href="#">{{brand}}</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li *ngFor="let contentReference of links"><a [routerLink]="[contentReference.route]">{{contentReference.title}}</a></li>
        </ul>
      </div>
    </nav>
`
})

export class NavigationBarComponent implements OnInit {
  @Input() brand: string;
  links = [ new ContentReference( '/content/home', 'Home' ), new ContentReference( '/content/child-one', 'Child one' ), new ContentReference( '/content/child-two', 'Child two' )];

  constructor( private desktop: Desktop ) { }

  ngOnInit() {
    this.brand = this.desktop.navigationBar.brand;
  }

}
