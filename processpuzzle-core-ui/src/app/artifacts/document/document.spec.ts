import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';

import { Document } from './document';

describe('Document entity', () => {
  const SOMETHING_ELSE  = 'something else';
  const DOCUMENT_FILE_NAME = 'classpath:sampleDocuments/SplashForm.png';
  const DOCUMENT_MIME_TYPE = 'image/png';
  const DOCUMENT_PATH = '';
  const DOCUMENT_TITLE = 'Test document';
  const jsonObject = { 'title': 'Test document', 'fileName': 'classpath:sampleDocuments/SplashForm.png', 'mimeType': 'image/png', 'path': ''};

  const jsonConvert: JsonConvert = new JsonConvert();
  jsonConvert.operationMode = OperationMode.LOGGING; // print some debug data
  jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
  jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null

  let document: Document;

  beforeEach(() => {
    document = new Document( DOCUMENT_TITLE, DOCUMENT_FILE_NAME, DOCUMENT_MIME_TYPE, DOCUMENT_PATH );
  });

  it('properties can be read', () => {
    expect( document.id ).toBeUndefined();
    expect( document.fileName ).toEqual( DOCUMENT_FILE_NAME );
    expect( document.path ).toEqual( DOCUMENT_PATH );
    expect( document.mimeType ).toEqual( DOCUMENT_MIME_TYPE );
    expect( document.title ).toEqual( DOCUMENT_TITLE );
  });

  it('properties can be set', () => {
    document.fileName = SOMETHING_ELSE;
    document.path = SOMETHING_ELSE;
    document.mimeType = SOMETHING_ELSE;
    document.title = SOMETHING_ELSE;

    expect( document.fileName ).toEqual( SOMETHING_ELSE );
    expect( document.path ).toEqual( SOMETHING_ELSE );
    expect( document.mimeType ).toEqual( SOMETHING_ELSE );
    expect( document.title ).toEqual( SOMETHING_ELSE );
  });

  it('can be serialized to JSON', () => {
    const serializedDocument = jsonConvert.serialize( document ) ;
    expect( serializedDocument ).toEqual( jsonObject );
  });

  it('can be deserialized from JSON', () => {
    const deserializedDocument: Document = (<any>jsonConvert).deserializeObject( jsonObject, Document ) ;
    expect( deserializedDocument ).toEqual( document );
  });
});
