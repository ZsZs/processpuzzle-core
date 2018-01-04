import { Desktop, DesktopEvent } from './desktop';
import { BreadCrumb } from './bread-crumb/bread-crumb';
import { Footer } from './footer/footer';

describe('Desktop', () => {
   const breadcrumb = new BreadCrumb();
   const footer = new Footer();

   let desktop: Desktop;

   beforeEach(() => {
      desktop = new Desktop();
   });

   it('constructor has no arguments', () => {
      expect( desktop ).toBeDefined();
   });

   it('breadcrumb property can be updated and notifies subscribers about desktop change', () => {
      expect( desktop.breadCrumb ).toBeUndefined();
      desktop.watchDesktopChange().subscribe(( message: DesktopEvent ) => {
         desktop.updateBreadCrumb( breadcrumb );
         expect( desktop.breadCrumb ).toBe( breadcrumb );
         expect( message ).toBe( DesktopEvent.UpdateBreadcrumb );
      });
   });

   it('footer property can be updated', () => {
      expect( desktop.footer ).toBeUndefined();
      desktop.updateFooter( footer );
      expect( desktop.footer ).toBe( footer );
   });

   it('properties can be read', () => {
      desktop.updateBreadCrumb( breadcrumb );
      desktop.updateFooter( footer );
      expect( desktop.breadCrumb ).toBe( breadcrumb );
      expect( desktop.footer ).toBe( footer );
   });
});
