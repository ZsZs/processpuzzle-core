import { Component, Inject, OnInit } from '@angular/core';
import { Routes } from '@angular/router';

import { Desktop } from './desktop';
import { DesktopComponentFactory } from './desktop-component-factory';
import { DynamicComponentDefinition } from './dynamic-component-definition';
import { SmartDocumentComponent } from '../content-editor/smart-document.component';
import { DesktopModule } from './desktop.module';

@Component({
  selector: 'pp-desktop',
  templateUrl: './desktop.component.html',
  styles: [``]
})

export class DesktopComponent implements OnInit {
  extraModules = [DesktopModule];
  public headerComponents = new Array<DynamicComponentDefinition>();
  public footerComponents = new Array<DynamicComponentDefinition>();
  isFooterVisible = false;

  constructor( public desktop: Desktop, private desktopComponentFactory: DesktopComponentFactory, @Inject('DynamicModule') public dynamicModule ) {}

  // public accessors and mutators

  // event handling methods
  ngOnInit() {
    this.desktop.watchDesktopChange().subscribe(
       ( ) => {
         this.headerComponents = this.desktopComponentFactory.generateHeaderComponents( this.desktop );
         this.footerComponents = this.desktopComponentFactory.generateFooterComponents( this.desktop );
         this.checkFooterVisibility();
       }
    )
  }

  // protected, private helper methods
   checkFooterVisibility() {
     this.isFooterVisible = this.footerComponents.length > 0;
   }
}

export const DESKTOP_ROUTES: Routes = [
   { path: '', redirectTo: '', pathMatch: 'full' },
   { path: 'content', component: DesktopComponent,
      children: [
         { path: 'home', component: SmartDocumentComponent },
         { path: 'child-one', component: SmartDocumentComponent },
         { path: 'child-two', component: SmartDocumentComponent }
      ]}
];

