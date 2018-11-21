import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params, Router, Routes } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { Document } from './document';
import { DocumentDetailsComponent } from './document-details.component';
import { DocumentGateway } from './document-gateway.service';
import { DocumentImageComponent } from './document-image.component';
import { JsonMapper } from 'processpuzzle-util-ui';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

export const routes: Routes = [
   { path: '', component: DocumentDetailsComponent },
   { path: 'management/documents', component: DocumentDetailsComponent }
];

describe( 'DocumentDetailsComponent', () => {
   const DOCUMENT_FILE_NAME = 'SplashForm.png';
   const DOCUMENT_MIME_TYPE = 'image/png';
   const DOCUMENT_PATH = 'sampleDocuments';
   const DOCUMENT_TITLE = 'Test document';
   const testDocument = new Document( DOCUMENT_TITLE, DOCUMENT_FILE_NAME, DOCUMENT_MIME_TYPE, DOCUMENT_PATH );
   const httpError = { error: {error: 'this is a test error'}, statusText: 'test error message', status: 402 };
   const uploadEventStub = { target: { files: [{ name: 'new file name', type: 'image/gif' }] }};
   let component: DocumentDetailsComponent;
   let documentGateway: DocumentGateway;
   let fixture: ComponentFixture<DocumentDetailsComponent>;
   let router: Router;
   let route: ActivatedRoute;
   let params: Subject<Params>;

   beforeEach( async( () => {
      params = new Subject<Params>();

      const documentGatewayStub = {
         subject: new Subject<Document>(),

         add( file: File, path: string, title: string ): Observable<Document> {
            const fileName: string = file.name;
            const mimeType: string = file.type;
            return Observable.of( new Document( title, fileName, mimeType, path ) );
         },

         findAll(): Observable<Document[]> {
            return Observable.of( [testDocument] );
         },

         findById( id: number ): Observable<Document> {
            return Observable.create( observer => {
               if ( id === 123 ) {
                  observer.next( testDocument );
               } else {
                  observer.error( new HttpErrorResponse( httpError ));
               }
               observer.complete();
            })
         },

         update( document: Document ): Observable<Document> {
            return Observable.of( document );
         }
      };

      TestBed.configureTestingModule( {
         imports: [ ReactiveFormsModule, FormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes( routes ) ],
         declarations: [ DocumentDetailsComponent, DocumentImageComponent ],
         providers: [
            JsonMapper,
            { provide: ActivatedRoute, useValue: { params: params }},
            { provide: DocumentGateway, useValue: documentGatewayStub } ]
      });
   }));

   beforeEach( () => {
      documentGateway = TestBed.get( DocumentGateway );
      fixture = TestBed.createComponent( DocumentDetailsComponent );
      const http = TestBed.get( HttpTestingController );
      component = fixture.componentInstance;
      router = TestBed.get( Router );
      route = TestBed.get( ActivatedRoute );
      router.initialNavigation();
   });

   it( 'should be created', () => {
      expect( component ).toBeTruthy();
   });

   it( 'onInit() creates and initializes form controls', () => {
      component.ngOnInit();
      expect( component.dataForm.controls[ 'title' ] ).toBeTruthy();
      expect( component.dataForm.controls[ 'title' ].value ).toBeNull();
      expect( component.dataForm.controls[ 'title' ].disabled ).toBeFalsy();
      expect( component.dataForm.controls[ 'fileName' ] ).toBeTruthy();
      expect( component.dataForm.controls[ 'fileName' ].value ).toBeNull();
      expect( component.dataForm.controls[ 'fileName' ].disabled ).toBeTruthy();
      expect( component.dataForm.controls[ 'mimeType' ] ).toBeTruthy();
      expect( component.dataForm.controls[ 'mimeType' ].value ).toBeNull();
      expect( component.dataForm.controls[ 'mimeType' ].disabled ).toBeTruthy();
   });

   it( 'onInit() if document is specified initializes form controls value with document properties', () => {
      component.document = testDocument;
      component.ngOnInit();
      expect( component.dataForm.controls[ 'title' ].value ).toEqual( testDocument.title );
      expect( component.dataForm.controls[ 'fileName' ].value ).toEqual( testDocument.fileName );
      expect( component.dataForm.controls[ 'mimeType' ].value ).toEqual( testDocument.mimeType );
   });

   it( 'afterViewInit() if document is given sets the form controls with document properties', () => {
      component.ngOnInit();
      component.document = testDocument;
      component.ngAfterViewInit();

      expect( component.dataForm.controls[ 'title' ].value ).toEqual( testDocument.title );
      expect( component.dataForm.controls[ 'fileName' ].value ).toEqual( testDocument.fileName );
      expect( component.dataForm.controls[ 'mimeType' ].value ).toEqual( testDocument.mimeType );
   });

   it( 'afterViewInit() if document is not given sets the form controls to empty or null', () => {
      component.ngOnInit();
      component.ngAfterViewInit();

      expect( component.dataForm.controls[ 'title' ].value ).toEqual( '' );
      expect( component.dataForm.controls[ 'fileName' ].value ).toBeNull();
      expect( component.dataForm.controls[ 'mimeType' ].value ).toEqual( '' );
   });

   it( 'onInit() subscribes to route parameters and gets the document by id', async(() => {
      fixture.detectChanges();
      params.next({ id: 123 });
      fixture.whenStable().then( () => {
         expect( component.document ).toEqual( testDocument );
      })
   }));

   it( 'onInit() subscribes to route parameters and logs error', async(() => {
      fixture.detectChanges();
      params.next({ id: 999 });
      fixture.whenStable().then( () => {
         expect( component.document ).toBeUndefined();
      })
   }));

   it( 'onInit() subscribes to route parameters and if id is null undefined does nothing', async(() => {
      fixture.detectChanges();
      params.next({ id: null });
      fixture.whenStable().then( () => {
         expect( component.document ).toBeUndefined();
      })
   }));

   it( 'onInit() subscribes to route parameters and if id is \'new\' then creates a new document and updates form controls', async(() => {
      fixture.detectChanges();
      params.next({ id: 'new' });
      fixture.whenStable().then( () => {
         expect( component.isNew ).toBeTruthy();
         expect( component.document.title ).toEqual( '' );
         expect( component.document.mimeType ).toEqual( '' );
         expect( component.document.fileName ).toBeNull();
         expect( component.dataForm.controls[ 'title' ].value ).toEqual( '' );
         expect( component.dataForm.controls[ 'fileName' ].value ).toBeNull();
         expect( component.dataForm.controls[ 'mimeType' ].value ).toEqual( '' );
      })
   }));

   it( 'onUpload() changes file name and mime type', async(() => {
      fixture.detectChanges();
      params.next({ id: 123 }); // causes to load existing document
      component.onUpload( uploadEventStub );

      fixture.whenStable().then( () => {
         expect( component.document.title ).toEqual( testDocument.title );
         expect( component.document.fileName ).toEqual( uploadEventStub.target.files[0].name );
         expect( component.document.mimeType ).toEqual( uploadEventStub.target.files[0].type );
      })
   }));

   it( 'onSubmit() if it was an existing document updates the title (only) and saves the document', async(() => {
      fixture.detectChanges();
      params.next({ id: 123 }); // causes to load existing document
      component.dataForm.controls[ 'title' ].setValue( 'new title' );
      component.dataForm.controls[ 'fileName' ].setValue( 'new file name' );
      component.dataForm.controls[ 'mimeType' ].setValue( 'new mimeType' );

      component.onSubmit();

      fixture.whenStable().then( () => {
         expect( component.document.title ).toEqual( 'new title' );
         expect( component.document.fileName ).toEqual( testDocument.fileName );
         expect( component.document.mimeType ).toEqual( testDocument.mimeType );
      })
   }));

   it( 'onSubmit() if a new document was created updates the title (only) and saves the document', async(() => {
      fixture.detectChanges();
      params.next({ id: 'new' }); // causes to create document
      component.onUpload( uploadEventStub );
      component.dataForm.controls[ 'title' ].setValue( 'new title' );
      component.onSubmit();

      fixture.whenStable().then( () => {
         expect( component.document.title ).toEqual( 'new title' );
         expect( component.document.fileName ).toEqual( uploadEventStub.target.files[0].name );
         expect( component.document.mimeType ).toEqual( uploadEventStub.target.files[0].type );
      })
   }));
});
