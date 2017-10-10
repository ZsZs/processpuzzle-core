import {Component, OnInit, EventEmitter} from '@angular/core';
import {MaterializeDirective, MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'pp-desktop-editor-menu',
  templateUrl: 'desktop-editor-menu.component.html',
  styles: [`.toolButton { margin: 15px; position:absolute; bottom:0; left:0; }`, `.brandContainer { padding-left: 10px; padding-right: 10px; padding-top: 3px; }`, `.brandImage { height: 45px; }`]
})

export class DesktopEditorMenuComponent implements OnInit {
  isAnchorHidden = true;
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor() { }

  // public accessors and mutators
  public hideEditor() {
    this.modalActions.emit({action: 'sideNav', params: ['hide']});
  }

  public showEditor() {
    this.modalActions.emit({action: 'sideNav', params: ['show']});
  }

  ngOnInit() {
  }

}
