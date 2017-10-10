import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {isNullOrUndefined} from 'util';

import {NavigationBar} from './navigation-bar/navigation-bar';
import {BreadCrumb} from './bread-crumb/bread-crumb';
import {Footer} from './footer/footer';

export enum ContentActions {
  EditContent,
  SaveContent
}

@Injectable()
export class Desktop {
  private contentActionSubject = new Subject<ContentActions>();
  private desktopTemplateSource = new Subject<string>();
  private _breadCrumb: BreadCrumb;
  private _footer: Footer;
  private _navigationBar: NavigationBar;
  id: string;
  name = 'Sample Desktop';

  // constructors
  constructor() { }

  // public accessors and mutators
  deleteBreadCrumb () {
    this._breadCrumb = null;
    this.announceDesktopChanged();
  }

  deleteFooter() {
    this._footer = null;
    this.announceDesktopChanged();
  }

  deleteNavigationBar() {
    this._navigationBar = null;
    this.announceDesktopChanged();
  }

  contentAction( action: ContentActions ) {
    this.contentActionSubject.next( action );
  }

  hasElements (): boolean {
    if ( isNullOrUndefined( this._navigationBar ) && isNullOrUndefined( this._footer ) && isNullOrUndefined( this._breadCrumb ) ) {
      return false;
    }
    return true;
  }

  updateBreadCrumb ( newBreadCrumb: BreadCrumb ) {
    this._breadCrumb = newBreadCrumb;
    this.announceDesktopChanged();
  }

  updateFooter ( newFooter: Footer ) {
    this._footer = newFooter;
    this.announceDesktopChanged();
  }

  updateNavigationBar ( newNavigationBar: NavigationBar ) {
    this._navigationBar = newNavigationBar;
    this.announceDesktopChanged();
  }

   watchContentAction(): Observable<ContentActions> {
      return this.contentActionSubject.asObservable();
   }

  watchDesktopChange(): Observable<string> {
    return this.desktopTemplateSource.asObservable();
  }

  // properties
  public get breadCrumb(): BreadCrumb { return this._breadCrumb; }
  public get footer(): Footer { return this._footer; }
  public get navigationBar(): NavigationBar { return this._navigationBar; }

  // protected, private helper methods
  private announceDesktopChanged() {
    this.desktopTemplateSource.next();
  }
}
