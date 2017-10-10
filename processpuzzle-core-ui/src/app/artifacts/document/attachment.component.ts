import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Document} from './document';
import {isNullOrUndefined} from 'util';
import {UrlBuilder} from '../../utility/url-builder';

@Component({
  selector: 'pp-attachment',
  template: `
    <div class="row">
        <div class="collection">
            <a class="collection-item" *ngFor="let document of documents" (click)="onSelect( document )">
                <div>
                    {{ document.title }}
                    <div class="secondary-content" [hidden]="document != selectedDocument">
                        <i class="material-icons">check</i>
                    </div>
                </div>
            </a>
        </div>
        <div style="position: relative; height: 70px;">
          <div class="fixed-action-btn toolbar inlineToolbar">
              <a class="btn-floating btn-large blue"><i class="large material-icons">mode_edit</i></a>
              <ul>
                  <li class="waves-effect waves-light"><a (click)="onDelete()"><i class="material-icons">delete</i></a></li>
                  <li class="waves-effect waves-light"><a (click)="onDetach()"><i class="material-icons">close</i></a></li>
                  <li class="waves-effect waves-light"><a (click)="onOpen()"><i class="material-icons">pageview</i></a></li>
                  <li class="waves-effect waves-light"><a (click)="onUpload()"><i class="material-icons">cloud_upload</i></a></li>
                  <li class="waves-effect waves-light"><a (click)="onAttach()"><i class="material-icons">attach_file</i></a></li>
              </ul>
          </div>
        </div>
    </div>
  `,
  styles: [`.inlineToolbar {position: absolute; display: inline-block; right: 24px;}`]
})
export class AttachmentComponent implements OnInit {
  @Input() documents: Document[];
  @Output() onAttachDocument = new EventEmitter<Document>();
  @Output() onDeleteDocument = new EventEmitter<Document>();
  @Output() onDetachDocument = new EventEmitter<Document>();
  public selectedDocument: Document;
  private readonly fileServiceProperties = 'fileService';
  private resourcePath = 'files';
  private urlBuilder = new UrlBuilder( this.fileServiceProperties, this.resourcePath );

  constructor() { }

  // event handling methods
  ngOnInit() {
  }

  onAttach() {
    this.onAttachDocument.emit();
  }

  onDelete() {
    if ( !isNullOrUndefined( this.selectedDocument )) {
      this.onDeleteDocument.emit( this.selectedDocument );
    }
  }

  onDetach() {
    if ( !isNullOrUndefined( this.selectedDocument )) {
      this.onDetachDocument.emit( this.selectedDocument );
    }
  }

  onOpen() {
    window.open( this.urlBuilder.buildResourceUrl( this.selectedDocument.id.toString() ), '_blank' );
  }

  onSelect(document: Document) {
    this.selectedDocument = document;
  }

  onUpload() {
  }

  // protected, private helper methods

}
