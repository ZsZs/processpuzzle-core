import {Desktop} from '../desktop';
import {DynamicComponentDefinition} from '../dynamic-component-definition';
import {BreadCrumbComponent} from './bread-crumb.component';
export class BreadCrumbComponentFactory {

   generate(  desktop: Desktop ) {
      let breadCrumbDef: DynamicComponentDefinition;

      if ( desktop.breadCrumb ) {
         const breadCrumb = desktop.breadCrumb;
         breadCrumbDef = new DynamicComponentDefinition( BreadCrumbComponent, '<pp-bread-crumb></pp-bread-crumb>', {} );
      }

      return breadCrumbDef;
   }
}
