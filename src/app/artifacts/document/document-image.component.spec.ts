import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Document } from './document';
import { DocumentImageComponent } from './document-image.component';

describe( 'DocumentImageComponent', () => {
   const DOCUMENT_FILE_NAME = 'SplashForm.png';
   const DOCUMENT_MIME_TYPE = 'image/png';
   const DOCUMENT_PATH = 'sampleDocuments';
   const DOCUMENT_TITLE = 'Test document';
   const testDocument = new Document( DOCUMENT_TITLE, DOCUMENT_FILE_NAME, DOCUMENT_MIME_TYPE, DOCUMENT_PATH );
   let component: DocumentImageComponent;
   let fixture: ComponentFixture<DocumentImageComponent>;

   beforeEach( async( () => {
      TestBed.configureTestingModule( {
         declarations: [ DocumentImageComponent ]
      }).compileComponents();
   }));

   beforeEach( () => {
      fixture = TestBed.createComponent( DocumentImageComponent );
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it( 'should be created', () => {
      expect( component ).toBeTruthy();
   });

   it( 'isImage() can determine if the document is an image', () => {
      component.document = testDocument;
      expect( component.isImage() ).toBeTruthy();
   });

   it( 'isImage() if document is null or undefined return false', () => {
      expect( component.isImage() ).toBeFalsy();
   });

   it( 'imageUrl() compiles full URL from service URI and id', () => {
      spyOnProperty( testDocument, 'id', 'get' ).and.returnValue( 1 );
      component.document = testDocument;
      expect( component.imageUrl() ).toEqual( 'http://file.processpuzzle.com/files/1' );
   });
});
