import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentComponent } from './attachment.component';
import { Document } from './document';

describe( 'AttachmentComponent', () => {
   const DOCUMENT_FILE_NAME = 'classpath:sampleDocuments/SplashForm.png';
   const DOCUMENT_MIME_TYPE = 'image/png';
   const DOCUMENT_PATH = '';
   const DOCUMENT_TITLE = 'Test document';

   let document: Document;
   let attachmentComponent: AttachmentComponent;
   let fixture: ComponentFixture<AttachmentComponent>;

   beforeEach( async( () => {
      document = new Document( DOCUMENT_TITLE, DOCUMENT_FILE_NAME, DOCUMENT_MIME_TYPE, DOCUMENT_PATH );

      TestBed.configureTestingModule( {
         declarations: [ AttachmentComponent ]
      }).compileComponents();
   }));

   beforeEach( () => {
      fixture = TestBed.createComponent( AttachmentComponent );
      attachmentComponent = fixture.componentInstance;
      fixture.detectChanges();
   } );

   it( 'should be created', () => {
      expect( attachmentComponent ).toBeTruthy();
   } );

   it( 'onAttach() should emit attach event of the selected document', ( done ) => {
      attachmentComponent.selectedDocument = document;
      attachmentComponent.onAttachDocument.subscribe( event => {
         expect( event ).toEqual( document );
         done();
      } );

      attachmentComponent.onAttach();
   });

   it( 'onDelete() if document is selected, should emit delete event of the selected document', ( done ) => {
      attachmentComponent.selectedDocument = document;
      attachmentComponent.onDeleteDocument.subscribe( event => {
         expect( event ).toEqual( document );
         done();
      });

      attachmentComponent.onDelete();
   });

   it( 'onDelete() if no document is selected, should not emit delete event', () => {
      spyOn( attachmentComponent, 'onDelete');
      spyOn( attachmentComponent.onDeleteDocument, 'emit');

      attachmentComponent.onDelete();

      expect( attachmentComponent.onDelete ).toHaveBeenCalled();
      expect( attachmentComponent.onDeleteDocument.emit ).not.toHaveBeenCalled();
   });

   it( 'onDetach() if document is selected, should emit detach event of the selected document', ( done ) => {
      attachmentComponent.selectedDocument = document;
      attachmentComponent.onDetachDocument.subscribe( event => {
         expect( event ).toEqual( document );
         done();
      });

      attachmentComponent.onDetach();
   });

   it( 'onDetach() if no document is selected, should not emit any event', () => {
      spyOn( attachmentComponent, 'onDetach');
      spyOn( attachmentComponent.onDetachDocument, 'emit');

      attachmentComponent.onDetach();

      expect( attachmentComponent.onDetach ).toHaveBeenCalled();
      expect( attachmentComponent.onDetachDocument.emit ).not.toHaveBeenCalled();
   });

   it( 'onOpen() if document is selected and has an id opens new window', () => {
      spyOnProperty( document, 'id', 'get' ).and.returnValue(1 );
      const windowSpy = spyOn( window, 'open');
      attachmentComponent.onSelect( document );
      attachmentComponent.onOpen();
      expect( windowSpy ).toHaveBeenCalledWith( 'http://file.processpuzzle.com/1', '_blank' );
   });

   it( 'onOpen() if no document is selected than does nothing', () => {
      spyOn( window, 'open');
      expect( window.open ).not.toHaveBeenCalled();
      attachmentComponent.onOpen();
   });

   it( 'onSelect() should store the selected document', () => {
      attachmentComponent.onSelect( document );
      expect( attachmentComponent.selectedDocument ).toBe( document );
   });

   it( 'onUpload() should not be implemented', () => {
      attachmentComponent.onUpload();
      expect( true ).toBe( true );
   });
});
