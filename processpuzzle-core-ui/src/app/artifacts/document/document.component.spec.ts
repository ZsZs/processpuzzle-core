import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Document } from './document';
import { DocumentComponent } from './document.component';
import { DocumentListComponent } from './document-list.component';
import { DocumentGateway } from './document-gateway.service';
import { JsonMapper } from '../../utility/json-mapper';

describe('DocumentComponent', () => {
  const DOCUMENT_FILE_NAME = 'SplashForm.png';
  const DOCUMENT_MIME_TYPE = 'image/png';
  const DOCUMENT_PATH = 'sampleDocuments';
  const document = new Document( DOCUMENT_FILE_NAME, DOCUMENT_MIME_TYPE, DOCUMENT_PATH );

  let component: DocumentComponent;
  let fixture: ComponentFixture<DocumentComponent>;

  beforeEach(async(() => {
    const documentGatewayStub = {
      subject: new Subject<Document>(),

      findAll(): Observable<Document[]> {
        this.subject.next( [document]);
        return this.subject.asObservable();
      }
    };

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ DocumentComponent, DocumentListComponent ],
      providers:    [ JsonMapper, { provide: DocumentGateway, useValue: documentGatewayStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent( DocumentComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
