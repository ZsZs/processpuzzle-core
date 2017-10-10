import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ContactRouteModule } from './contact.route';
import { ContactDetailsComponent } from './contact-details.component';
import { ContactListComponent } from './contact-list.component';
import { ContactComponent } from './contact.component';

@NgModule({
  imports: [
    CommonModule,
    ContactRouteModule,
  ],
  declarations: [
     ContactComponent,
     ContactDetailsComponent,
     ContactListComponent
  ],
  exports: [
     ContactComponent,
     ContactDetailsComponent,
     ContactListComponent
  ]
})
export class ContactModule {
}
