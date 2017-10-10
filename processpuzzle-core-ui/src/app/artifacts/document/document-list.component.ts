import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Document } from './document';
import { DocumentGateway } from './document-gateway.service';
import { isNullOrUndefined } from 'util';
import { JsonMapper } from '../../utility/json-mapper';
import { UrlBuilder } from '../../utility/url-builder';

@Component( {
   selector: 'pp-document-list',
   template: `
       <div class="collection">
           <a class="collection-item" [routerLink]="[document.id]" routerLinkActive="active" *ngFor="let document of documents" (click)="onSelect( document )">
               <div>
                   <strong>{{ document.title }}</strong>
                   <div class="secondary-content" [hidden]="document != selectedDocument">
                       <i class="material-icons">check</i>
                   </div>
               </div>
           </a>
       </div>

       <div class="modal-footer">
           <button class="btn light-green waves-effect" (click)="onNew()">New<i class="material-icons right">note_add</i></button>
           <button class="btn light-blue waves-effect" [disabled]="!selectedDocument" (click)="onOpen()">Open<i class="material-icons right">pageview</i></button>
           <button class="btn red waves-effect" [disabled]="!selectedDocument" (click)="onDelete()">Delete<i class="material-icons right">delete_forever</i></button>
           <button class="btn light-blue waves-effect" [disabled]="!canAttached()" (click)="onAttach()">Attach<i class="material-icons right">attach_file</i></button>
       </div>
   `,
   styles: [ `.btn-upload {
       background-color: white;
       height: 35px;
       line-height: 35px;
       margin-left: 3px;
       margin-right: 4px;
       padding: 0 0.5rem;
   }` ]
} )
export class DocumentListComponent implements AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnInit {
   public static readonly SELECTED_DOCUMENT_PARAM = 'selectedDocument';
   documents: Document[];
   public selectedDocument: Document;
   private readonly ROUTER_LINK_PARAM = 'backRouterLink';
   private backRouterLink: string;
   private readonly fileServiceProperties = 'fileService';
   private resourcePath = 'files';
   private urlBuilder = new UrlBuilder( this.fileServiceProperties, this.resourcePath );

   constructor( protected router: Router, private route: ActivatedRoute, private documentGateway: DocumentGateway, private jsonMapper: JsonMapper ) {
   }

   // public accessors and mutators
   public canAttached(): boolean {
      return !isNullOrUndefined( this.selectedDocument ) && !isNullOrUndefined( this.backRouterLink );
   }

   // event handling methods
   ngAfterContentInit(): void {
      console.log( 'AfterContentInit' );
   }

   ngAfterContentChecked(): void {
      console.log( 'AfterContentChecked' );
   }

   ngAfterViewInit(): void {
      console.log( 'AfterViewInit' );
   }

   ngAfterViewChecked(): void {
      console.log( 'AfterViewChecked' );
   }

   ngOnInit() {
      this.retrieveDocuments();
      this.backRouterLink = this.route.snapshot.queryParamMap.get( this.ROUTER_LINK_PARAM );
      this.route.url.subscribe( ( urlSegments: UrlSegment[] ) => {
         if ( urlSegments.length === 1 && urlSegments[ 0 ].path === 'documents' ) {
            this.retrieveDocuments();
         }
      } );
   }

   public onAttach() {
      if ( !isNullOrUndefined( this.backRouterLink ) ) {
         this.router.navigate( [ this.backRouterLink ], { queryParams: { 'selectedDocument': this.selectedDocument.id.toString() } } );
      }
   }

   onDelete() {
      this.documentGateway.delete( this.selectedDocument.id ).subscribe( () => {
         const start = this.documents.lastIndexOf( this.selectedDocument );
         this.documents.splice( start, 1 );
         this.navigateToList();
      } );
   }

   onNew() {
      this.navigateToDocumentDetails( 'new' );
   }

   onOpen() {
      window.open( this.urlBuilder.buildResourceUrl( this.selectedDocument.id.toString() ), '_blank' );
   }

   onSelect( document: Document ) {
      this.selectedDocument = document;
   }

   onSubmit() {
   }

   // protected, private helper methods
   private handleError( error: HttpErrorResponse ) {
      if ( error.error instanceof Error ) {
         console.log( 'An error occurred:', error.error.message );
      } else {
         console.log( `Backend returned code ${ error.status}, body was: ${ error.error }` );
      }
   }

   private navigateToDocumentDetails( command?: string ) {
      let resourceUri: string;
      if ( isNullOrUndefined( command ) ) {
         if ( isNullOrUndefined( this.selectedDocument ) ) {
            resourceUri = '';
         } else if ( isNullOrUndefined( this.selectedDocument.id ) ) {
            resourceUri = 'new';
         } else {
            resourceUri = this.selectedDocument.id.toString();
         }
      } else {
         resourceUri = command;
      }

      this.router.navigate( [ '/management/documents', resourceUri ] );
   }

   private navigateToList() {
      this.router.navigate( [ '/management/documents' ] );
   }

   private retrieveDocuments(): void {
      this.documentGateway.findAll().subscribe(
         response => {
            this.documents = (<any>this.jsonMapper).deserializeArray( response, Document );
            this.selectedDocument = null;
         },
         error => {
            this.handleError( error );
         } );
   }
}
