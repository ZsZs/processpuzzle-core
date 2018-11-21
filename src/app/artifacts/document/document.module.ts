import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DocumentRouteModule } from './document.route';
import { AttachmentComponent } from './attachment.component';
import { DocumentComponent } from './document.component';
import { DocumentDetailsComponent } from './document-details.component';
import { DocumentImageComponent } from './document-image.component';
import { DocumentListComponent } from './document-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DocumentRouteModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
     AttachmentComponent,
     DocumentComponent,
     DocumentDetailsComponent,
     DocumentImageComponent,
     DocumentListComponent
  ],
  exports: [
     AttachmentComponent,
     DocumentComponent,
     DocumentDetailsComponent,
     DocumentImageComponent,
     DocumentListComponent
  ]
})
export class DocumentModule {
}
