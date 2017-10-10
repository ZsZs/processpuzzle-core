import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Document } from './document';
import { DocumentDetailsComponent } from './document-details.component';
import { DocumentGateway } from './document-gateway.service';
import { DocumentImageComponent } from './document-image.component';
import { JsonMapper } from '../../utility/json-mapper';

describe('DocumentDetailsComponent', () => {
   const DOCUMENT_FILE_NAME = 'SplashForm.png';
   const DOCUMENT_MIME_TYPE = 'image/png';
   const DOCUMENT_PATH = 'sampleDocuments';
   const document = new Document( DOCUMENT_FILE_NAME, DOCUMENT_MIME_TYPE, DOCUMENT_PATH );
  let component: DocumentDetailsComponent;
  let fixture: ComponentFixture<DocumentDetailsComponent>;

  beforeEach(async(() => {
     const documentGatewayStub = {
        subject: new Subject<Document>(),

        findAll(): Observable<Document[]> {
           this.subject.next( [document]);
           return this.subject.asObservable();
        }
     };

    TestBed.configureTestingModule({
      imports:      [ ReactiveFormsModule, FormsModule, RouterTestingModule ],
      declarations: [ DocumentDetailsComponent, DocumentImageComponent ],
      providers:    [ JsonMapper, { provide: DocumentGateway, useValue: documentGatewayStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
