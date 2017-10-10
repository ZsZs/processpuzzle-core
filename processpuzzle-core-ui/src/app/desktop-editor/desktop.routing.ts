import {Routes} from '@angular/router';
import {DesktopComponent} from './desktop.component';
import {SmartDocumentComponent} from '../content-editor/smart-document.component';

export const DESKTOP_ROUTES: Routes = [
   { path: '', redirectTo: '', pathMatch: 'full' },
   { path: 'content', component: DesktopComponent,
      children: [
         { path: 'home', component: SmartDocumentComponent },
         { path: 'child-one', component: SmartDocumentComponent },
         { path: 'child-two', component: SmartDocumentComponent }
      ]}
];

