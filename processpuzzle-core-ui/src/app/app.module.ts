// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Third party components
import { MaterializeModule } from 'angular2-materialize';
import { ModalModule, BsDropdownModule } from 'ng2-bootstrap';
import { NgxDynamicTemplateModule } from 'ngx-dynamic-template';

// ProcessPuzzle components
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routing';
import { BreadCrumbEditorComponent } from './desktop-editor/bread-crumb/bread-crumb-editor.component';
import { Desktop } from './desktop-editor/desktop';
import { DesktopComponent } from './desktop-editor/desktop.component';
import { DesktopEditorComponent } from './desktop-editor/desktop-editor.component';
import { DesktopEditorMenuComponent } from './desktop-editor/desktop-editor-menu.component';
import { DesktopEditorToolbarComponent } from './desktop-editor/desktop-editor-toolbar.component';
import { FooterEditorComponent } from './desktop-editor/footer/footer-editor.component';
import { environment } from '../environments/environment';
import { HttpLoggingInterceptor } from 'processpuzzle-util-ui';
import { IntroComponent } from './intro.component';
import { NavigationBarEditorComponent } from './desktop-editor/navigation-bar/navigation-bar-editor.component';
import { NavigationBarService } from './desktop-editor/navigation-bar/navigation-bar.service';
import { SmartDocumentComponent } from './content-editor/smart-document.component';
import { ContentComponent } from './content-editor/content.component';

import { ProcessPuzzleUtilkModule } from 'processpuzzle-util-ui';

const DynamicTemplateModule = NgxDynamicTemplateModule.forRoot({ routes: APP_ROUTES });

@NgModule({
  declarations: [
    AppComponent,
    DesktopComponent,
    DesktopEditorComponent,
    DesktopEditorMenuComponent,
    DesktopEditorToolbarComponent,
    NavigationBarEditorComponent,
    BreadCrumbEditorComponent,
    IntroComponent,
    FooterEditorComponent,
    SmartDocumentComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    DynamicTemplateModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MaterializeModule,
    ModalModule.forRoot(),
    ProcessPuzzleUtilkModule,
    ReactiveFormsModule,
    RouterModule.forRoot( APP_ROUTES )
  ],
  providers: [Desktop,
             {provide: HTTP_INTERCEPTORS, useClass: HttpLoggingInterceptor, multi: true },
             {provide: 'DynamicModule', useValue: DynamicTemplateModule},
              NavigationBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
