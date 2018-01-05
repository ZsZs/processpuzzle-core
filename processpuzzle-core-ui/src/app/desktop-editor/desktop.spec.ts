import { fakeAsync, tick } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { ContentActions, Desktop, DesktopEvent } from './desktop';
import { BreadCrumb } from './bread-crumb/bread-crumb';
import { Footer } from './footer/footer';
import { NavigationBar } from './navigation-bar/navigation-bar';

describe('Desktop', () => {
   const breadcrumb = new BreadCrumb();
   const footer = new Footer();
   const navigationBar = new NavigationBar();

   let desktop: Desktop;

   beforeEach(() => {
      desktop = new Desktop();
   });

   it('constructor has no arguments', () => {
      expect( desktop ).toBeDefined();
   });

   it('breadcrumb property can be updated and notifies subscribers about desktop change', fakeAsync(() => {
      expect( desktop.breadCrumb ).toBeUndefined();
      desktop.watchDesktopChange().subscribe(( message: DesktopEvent ) => {
         expect( message ).toBe( DesktopEvent.UpdateBreadcrumb );
      });

      desktop.updateBreadCrumb( breadcrumb );
      expect( desktop.breadCrumb ).toBe( breadcrumb );
      tick();
   }));

   it('breadcrumb property can be deleted and notifies subscribers about desktop change', fakeAsync(() => {
      desktop.updateBreadCrumb( breadcrumb );
      expect( desktop.breadCrumb ).toBe( breadcrumb );
      desktop.watchDesktopChange().subscribe(( message: DesktopEvent ) => {
         expect( message ).toBe( DesktopEvent.DeleteBreadcrumb );
      });

      desktop.deleteBreadCrumb();
      expect( desktop.breadCrumb ).toBeNull();
      tick();
   }));

   it('footer property can be updated and notifies subscribers about desktop change', fakeAsync(() => {
      expect( desktop.footer ).toBeUndefined();
      desktop.watchDesktopChange().subscribe(( message: DesktopEvent ) => {
         expect( message ).toBe( DesktopEvent.UpdateFooter );
      });

      desktop.updateFooter( footer );
      expect( desktop.footer ).toBe( footer );
      tick();
   }));

   it('footer property can be deleted and notifies subscribers about desktop change', fakeAsync(() => {
      desktop.updateFooter( footer );
      expect( desktop.footer ).toBe( footer );
      desktop.watchDesktopChange().subscribe(( message: DesktopEvent ) => {
         expect( message ).toBe( DesktopEvent.DeleteFooter );
      });

      desktop.deleteFooter();
      expect( desktop.footer ).toBeNull();
      tick();
   }));

   it('navigationBar property can be updated and notifies subscribers about desktop change', fakeAsync(() => {
      expect( desktop.navigationBar ).toBeUndefined();
      desktop.watchDesktopChange().subscribe(( message: DesktopEvent ) => {
         expect( message ).toBe( DesktopEvent.UpdateNavigationBar );
      });

      desktop.updateNavigationBar( navigationBar );
      expect( desktop.navigationBar ).toBe( navigationBar );
      tick();
   }));

   it('navigationBar property can be deleted and notifies subscribers about desktop change', fakeAsync(() => {
      desktop.updateNavigationBar( navigationBar );
      expect( desktop.navigationBar ).toBe( navigationBar );
      desktop.watchDesktopChange().subscribe(( message: DesktopEvent ) => {
         expect( message ).toBe( DesktopEvent.DeleteNavigationBar );
      });

      desktop.deleteNavigationBar();
      expect( desktop.navigationBar ).toBeNull();
      tick();
   }));

   it('properties can be read', () => {
      desktop.updateBreadCrumb( breadcrumb );
      desktop.updateFooter( footer );
      desktop.updateNavigationBar( navigationBar );
      expect( desktop.breadCrumb ).toBe( breadcrumb );
      expect( desktop.footer ).toBe( footer );
      expect( desktop.navigationBar ).toBe( navigationBar );
   });

   it('can verify if it has no elements', () => {
      expect( desktop.breadCrumb ).toBeUndefined();
      expect( desktop.footer ).toBeUndefined();
      expect( desktop.navigationBar ).toBeUndefined();
      expect( desktop.hasElements() ).toBeFalsy();
   });

   it('can verify if it has no elements', () => {
      desktop.updateBreadCrumb( breadcrumb );
      desktop.updateFooter( footer );
      desktop.updateNavigationBar( navigationBar );
      expect( desktop.hasElements() ).toBeTruthy();
   });

   it('content actions can be watched', fakeAsync(() => {
      expect( desktop.watchContentAction() instanceof Observable ).toBeTruthy();
      desktop.watchContentAction().subscribe(( action: ContentActions ) => {
         expect( action ).toBe( ContentActions.EditContent );
      });

      desktop.contentAction( ContentActions.EditContent );
      tick();
   }));
});
