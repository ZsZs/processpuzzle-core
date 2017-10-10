import {Component, OnInit, Input} from '@angular/core';
import { Desktop } from '../desktop';

@Component({
  selector: 'pp-footer',
  template: `
    <div class="footer-copyright">
      <div class="container">© {{copyrightText}}
         <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
      </div>
    </div>
  `
})

export class FooterComponent implements OnInit {
  @Input() copyrightText: string;

  constructor( private desktop: Desktop ) { }

  ngOnInit() {
    this.copyrightText = this.desktop.footer.copyrightText;
  }

}
