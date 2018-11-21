import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {Desktop} from './desktop-editor/desktop';

@Component({
  selector: 'pp-intro',
  templateUrl: './intro.component.html',
  styles: [
    `.backgroundImage { background-image: url( '../assets/images/intro-background.jpg' ); background-repeat: no-repeat; background-size: cover; width: 100%; height: 100% }`
  ]
})

export class IntroComponent implements OnInit {
  isVisible: boolean;
   @Output() onShowEditorEvent = new EventEmitter<boolean>();

  // constructors
  constructor( private router: Router, private desktop: Desktop ) { }

  // public accessors and mutators
  showEditor() {
     this.onShowEditorEvent.emit( true );
  }

  ngOnInit() {
    this.isVisible = !this.desktop.hasElements();
    this.desktop.watchDesktopChange().subscribe(
       ( ) => {
         this.isVisible = !this.desktop.hasElements();
       }
    )
  }
}
