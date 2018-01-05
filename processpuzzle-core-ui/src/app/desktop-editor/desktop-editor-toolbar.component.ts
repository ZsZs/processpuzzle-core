import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ContentActions, Desktop } from './desktop';

@Component({
  selector: 'pp-desktop-editor-toolbar',
  template: `
      <div class="fixed-action-btn horizontal">
          <a class="btn-floating btn teal">
              <i class="large material-icons">mode_edit</i>
          </a>
          <ul>
              <li (click)="onShowEditor()"><a class="btn-floating red"><i class="material-icons">web</i></a></li>
              <li (click)="onEditContent()"><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
          </ul>
      </div>
  `,
  styles: []
})

export class DesktopEditorToolbarComponent implements OnInit {
   @Output() onShowEditorEvent = new EventEmitter<boolean>();

  constructor( private desktop: Desktop ) { }

  // public accessors and mutators

   // public accessors and mutators
   onEditContent() {
     this.desktop.contentAction( ContentActions.EditContent );
   }

   onShowEditor() {
      this.onShowEditorEvent.emit( true );
   }

  // event handling methods
  ngOnInit() {
  }

}
