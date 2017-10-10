import { Injectable } from '@angular/core';
import { UrlBuilder } from '../../utility/url-builder';
import { Observable } from 'rxjs/Observable';
import { Document } from './document';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {JsonMapper} from '../../utility/json-mapper';

@Injectable()
export class DocumentGateway {
  protected headers = new Headers({'Content-Type': 'application/json'});
  private readonly serviceProperties = 'documentService';
  private resourcePath = 'documents';
  private readonly _urlBuilder = new UrlBuilder( this.serviceProperties, this.resourcePath );

  constructor( protected http: HttpClient, protected jsonMapper: JsonMapper ) {}

  // public accessors and mutators
  public add( file: File, path: string, title: string ): Observable<Document> {
    const fileName: string = file.name;
    const mimeType: string = file.type;
    const document: Document = new Document( title, fileName, mimeType, path );

    const formData: FormData = new FormData();
    const jsonDocument = JSON.stringify( this.jsonMapper.serialize( document ));
    formData.append('file', file );
    formData.append('document', jsonDocument );

    const url = this.urlBuilder.buildResourceUrl();
    return this.http.post<Document>( url, formData );
  }

  public delete( id: number ): Observable<any> {
    const url = `${ this._urlBuilder.buildResourceUrl( id.toString() )}`;
    return this.http.delete( url );
  }

  public findAll(): Observable<Document[]> {
    return this.http.get<Document[]>( this._urlBuilder.buildResourceUrl( '' ))
  }

  public findById( id: number ): Observable<Document> {
    const url = `${ this._urlBuilder.buildResourceUrl( id.toString() )}`;
    return this.http.get<Document>(url);
  }

  public update( document: Document ): Observable<Document> {
    const url = `${ this._urlBuilder.buildResourceUrl( document.id.toString() )}`;
    return this.http.put<Document>( url, document );
  }

  // protected, private helper methods
  get urlBuilder(): UrlBuilder {
    return this._urlBuilder;
  }
}
