import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Document } from './document';
import { DocumentListComponent } from './document-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DocumentGateway } from './document-gateway.service';
import { JsonMapper } from '../../utility/json-mapper';
import { By } from '@angular/platform-browser';

describe( 'DocumentListComponent', () => {
   const DOCUMENT_FILE_NAME = 'SplashForm.png';
   const DOCUMENT_MIME_TYPE = 'image/png';
   const DOCUMENT_PATH = 'sampleDocuments';
   const document = new Document( DOCUMENT_FILE_NAME, DOCUMENT_MIME_TYPE, DOCUMENT_PATH );

   let component: DocumentListComponent;
   let fixture: ComponentFixture<DocumentListComponent>;

   const documentGatewayStub = {
      subject: new Subject<Document>(),

      findAll(): Observable<Document[]> {
         this.subject.next( [ document ] );
         return this.subject.asObservable();
      }
   };

   beforeEach( async( () => {
      TestBed.configureTestingModule( {
         imports: [ RouterTestingModule ],
         declarations: [ DocumentListComponent ],
         providers: [ JsonMapper, { provide: DocumentGateway, useValue: documentGatewayStub } ]
      } ).compileComponents();
   } ) );

   beforeEach( () => {
      fixture = TestBed.createComponent( DocumentListComponent );
      component = fixture.componentInstance;

      fixture.detectChanges();
   } );

   it( 'should be created', () => {
      expect( component ).toBeTruthy();
   } );

   it( 'creates a container: "div.collection" for document list', () => {
      const collectionContainer = fixture.debugElement.query( By.css( 'div.collection' )).nativeElement;
      expect( collectionContainer ).toBeTruthy();
   } );

   it( 'creates a container: "div.modal-footer" for buttons', () => {
      const collectionContainer = fixture.debugElement.query( By.css( 'div.modal-footer' )).nativeElement;
      expect( collectionContainer ).toBeTruthy();
   } );

   it( 'creates "New", "Open", "Delete", "Attach" buttons', () => {
      const buttons = fixture.debugElement.queryAll( By.css( 'div.modal-footer button' ));
      expect( buttons[0].nativeElement.textContent ).toContain( 'New' );
      expect( buttons[1].nativeElement.textContent ).toContain( 'Open' );
      expect( buttons[2].nativeElement.textContent ).toContain( 'Delete' );
      expect( buttons[3].nativeElement.textContent ).toContain( 'Attach' );
   } );
} );
