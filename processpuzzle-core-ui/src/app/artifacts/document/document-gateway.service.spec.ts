import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Document } from './document';
import { DocumentGateway } from './document-gateway.service';
import {JsonMapper} from '../../utility/json-mapper';

describe('DocumentGateway', () => {
  const DOCUMENT_CONTENT = 'Hello World';
  const DOCUMENT_FILE_NAME = 'TestFile.txt';
  const DOCUMENT_MIME_TYPE = 'text/plain';
  const DOCUMENT_PATH = '';
  const DOCUMENT_TITLE = 'Test Document';
  let expectedResponse;

  let documentGateway: DocumentGateway;
  let http: HttpTestingController;
  let resourceUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DocumentGateway, JsonMapper]
    });

    documentGateway = TestBed.get( DocumentGateway );
    http = TestBed.get( HttpTestingController );
    expectedResponse = new Document( DOCUMENT_TITLE, DOCUMENT_FILE_NAME, DOCUMENT_MIME_TYPE, DOCUMENT_PATH );
    resourceUrl = documentGateway.urlBuilder.buildResourceUrl();
  });

  it('health check: should be created', inject([DocumentGateway], (service: DocumentGateway) => {
    expect(service).toBeTruthy();
  }));

  it('add() instantiates a Document and POST to backend.', () => {
    const parts = [ new Blob(['you construct a file...'], { type: DOCUMENT_MIME_TYPE }), ' Same way as you do with blob', new Uint16Array([33] )];
    const file = new File( parts, DOCUMENT_FILE_NAME, <FilePropertyBag>{ type: DOCUMENT_MIME_TYPE, lastModified: new Date().getTime() });

    documentGateway.add( file, DOCUMENT_PATH, DOCUMENT_TITLE ).subscribe(( response: Document ) => {
      expect( response ).toEqual( expectedResponse );
    });

    http.expectOne( resourceUrl ).flush( expectedResponse );
    http.verify();
  });

  it('delete() send DELETE to backend.', () => {
    documentGateway.delete( 1 ).subscribe( () => {});

    http.expectOne( resourceUrl + '/1' ).flush( {} );
    http.verify();
  });

  it('findAll() GETs and array of Document form to backend.', () => {
    documentGateway.findAll().subscribe(( response: Document[] ) => {
      expect( response ).toEqual( [expectedResponse] );
    });

    http.expectOne( resourceUrl ).flush( [expectedResponse] );
    http.verify();
  });

  it('findBy() GETs one Document, identified by id form to backend.', () => {
    documentGateway.findById( 1 ).subscribe(( response: Document ) => {
      expect( response ).toEqual( expectedResponse );
    });

    http.expectOne( resourceUrl + '/1' ).flush( expectedResponse );
    http.verify();
  });

  it('update() PUT a Document to the backend.', () => {
    spyOnProperty( expectedResponse, 'id', 'get' ).and.returnValue( '1' );

    documentGateway.update( expectedResponse ).subscribe(( response: Document ) => {
      expect( response ).toEqual( expectedResponse );
    });

    http.expectOne( resourceUrl + '/1' ).flush( expectedResponse );
    http.verify();
  });
});
