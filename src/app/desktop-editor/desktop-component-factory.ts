import { Injectable } from '@angular/core';
import {Desktop} from './desktop';
import {DynamicComponentDefinition} from './dynamic-component-definition';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {BreadCrumbComponent} from './bread-crumb/bread-crumb.component';
import {NavigationBarComponentFactory} from './navigation-bar/navigation-bar-component-factory';
import {BreadCrumbComponentFactory} from './bread-crumb/bread-crumb-component-factory';
import {FooterComponentFactory} from './footer/footer-component-factory';

@Injectable()
export class DesktopComponentFactory {

  // constructors
  constructor() { }

  // public accesors and mutators
  generateHeaderComponents (desktop: Desktop ): Array<DynamicComponentDefinition> {
    const desktopComponentDefinitions = new Array<DynamicComponentDefinition>();
    let componentDefinition: DynamicComponentDefinition;

    componentDefinition = new NavigationBarComponentFactory().generate( desktop );
    if ( componentDefinition ) {
      desktopComponentDefinitions.push( componentDefinition );
    }

    componentDefinition = new BreadCrumbComponentFactory().generate( desktop );
    if ( componentDefinition ) {
      desktopComponentDefinitions.push( componentDefinition );
    }

    return desktopComponentDefinitions;
  }

  generateFooterComponents (desktop: Desktop ): Array<DynamicComponentDefinition> {
    const desktopComponentDefinitions = new Array<DynamicComponentDefinition>();
    let componentDefinition: DynamicComponentDefinition;

    componentDefinition = new FooterComponentFactory().generate( desktop );
    if ( componentDefinition ) {
      desktopComponentDefinitions.push( componentDefinition );
    }

    return desktopComponentDefinitions;
  }
}
