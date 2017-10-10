import { TestBed } from '@angular/core/testing';

import { JsonMapper } from './json-mapper';
import { Document } from '../artifacts/document/document';

describe('JSON Mapper', () => {
  const DOCUMENT_FILE_NAME = 'classpath:sampleDocuments/SplashForm.png';
  const DOCUMENT_MIME_TYPE = 'image/png';
  const DOCUMENT_PATH = 'some path';
  const DOCUMENT_TITLE = 'Test document';
  const document = new Document( DOCUMENT_TITLE, DOCUMENT_FILE_NAME, DOCUMENT_MIME_TYPE, DOCUMENT_PATH );
  const jsonObject = { 'title': 'Test document', 'fileName': 'classpath:sampleDocuments/SplashForm.png', 'mimeType': 'image/png', 'path': 'some path'};

  let jsonMapper: JsonMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonMapper]
    });

    jsonMapper = TestBed.get( JsonMapper );
  });

  it( 'serialize() maps object to string', () => {
    expect( jsonMapper.serialize( document )).toEqual( jsonObject );
  });

  it( 'deserialize() maps string to object', () => {
    expect( (<any>jsonMapper).deserialize( jsonObject, Document )).toEqual( document );
  });
});
