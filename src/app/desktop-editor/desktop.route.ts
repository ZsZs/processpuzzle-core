import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: FooterComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class DesktopRouteModule {
}
