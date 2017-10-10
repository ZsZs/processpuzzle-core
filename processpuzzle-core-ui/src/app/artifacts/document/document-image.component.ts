import {Component, Input, OnInit} from '@angular/core';
import {UrlBuilder} from '../../utility/url-builder';

import {Document} from './document';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'pp-document-image',
  template: `
      <div>
          <img class="materialboxed responsive-img" src="{{imageUrl()}}" *ngIf="isImage()">
      </div>
  `,
  styles: []
})
export class DocumentImageComponent implements OnInit {
  private readonly FILE_SERVICE_PROPERTIES = 'fileService';
  @Input() document: Document;
  private resourcePath = 'files';
  private urlBuilder = new UrlBuilder( this.FILE_SERVICE_PROPERTIES, this.resourcePath );

  // public accessors and mutators
  public imageUrl() {
    return this.urlBuilder.buildResourceUrl( this.document.id.toString() );
  }

  isImage(): boolean {
    if ( !isNullOrUndefined( this.document )) {
      return this.document.mimeType.includes( 'image/' )
    }
    return false;
  }

  // life cycle hooks, event handling
  ngOnInit() {
  }
}
