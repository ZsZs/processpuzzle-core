import { Routes } from '@angular/router';

import { ContentComponent } from './content-editor/content.component';
import { BreadCrumbEditorComponent } from './desktop-editor/bread-crumb/bread-crumb-editor.component';
import { FooterEditorComponent } from './desktop-editor/footer/footer-editor.component';
import { NavigationBarEditorComponent } from './desktop-editor/navigation-bar/navigation-bar-editor.component';
import { SmartDocumentComponent } from './content-editor/smart-document.component';

export const APP_ROUTES: Routes = [
   { path: '', redirectTo: '', pathMatch: 'full' },
   { path: 'content',
      children: [
         { path: ':id', component: SmartDocumentComponent }
      ]},
   { path: 'desktop-editor',
      children: [
         { path: 'breadcrumb', component: BreadCrumbEditorComponent },
         { path: 'footer', component: FooterEditorComponent },
         { path: 'navbar', component: NavigationBarEditorComponent }
      ]},
];
