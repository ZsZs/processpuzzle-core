import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationBarService } from './navigation-bar/navigation-bar.service';
import { DesktopEditorMenuComponent } from './desktop-editor-menu.component';

@Component( {
   selector: 'pp-desktop-editor',
   template: `
       <pp-intro (onShowEditorEvent)="onShowEditor( $event )"></pp-intro>
       <pp-desktop-editor-toolbar (onShowEditorEvent)="onShowEditor( $event )"></pp-desktop-editor-toolbar>
       <pp-desktop-editor-menu></pp-desktop-editor-menu>
       <router-outlet (desktopChanged)="onDesktopChanged($event)"></router-outlet>
   `,
   providers: [ NavigationBarService ]
} )
export class DesktopEditorComponent implements OnInit {
   desktopTemplate = '';
   @ViewChild( DesktopEditorMenuComponent ) desktopEditor: DesktopEditorMenuComponent;

   // constructors
   constructor() {
   }

   // public accessors and mutators

   // event handling methods
   onDesktopChanged( desktopTemplate ) {
      this.desktopTemplate = desktopTemplate;
   }

   ngOnInit() {
   }

   onShowEditor( isVisible: boolean ) {
      this.desktopEditor.showEditor();
   }
}
