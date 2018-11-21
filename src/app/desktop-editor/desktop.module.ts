import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { DesktopRouteModule } from './desktop.route';
import { FooterComponent } from './footer/footer.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

@NgModule({
  imports: [
    CommonModule,
    DesktopRouteModule,
  ],
  declarations: [
     BreadCrumbComponent,
     FooterComponent,
     NavigationBarComponent
  ],
  exports: [
     BreadCrumbComponent,
     FooterComponent,
     NavigationBarComponent
  ]
})
export class DesktopModule {
}
