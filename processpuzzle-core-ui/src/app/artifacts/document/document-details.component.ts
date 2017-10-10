import {ActivatedRoute, Params, Router} from '@angular/router';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Document} from './document';
import {DocumentGateway} from './document-gateway.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'pp-document-details',
  template: `
      <div id="document-details" class="">
          <form class="col s12" [formGroup]="dataForm" (ngSubmit)="onSubmit()">
              <div class="row">
                  <div class="col s12">
                      <div class="input-field">
                          <input id="title" type="text" class="validate" formControlName="title">
                          <label class="active" for="title" data-error="wrong" data-success="right">Title</label>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col s12">
                      <pp-document-image [document]="document"></pp-document-image>
                  </div>
              </div>
              <div class="row">
                  <div class="col s12">
                      <div class="file-field input-field">
                          <div class="btn" *ngIf="isNew">
                              <span>File</span>
                              <input type="file" (change)="onUpload($event)">
                          </div>
                          <div class="file-path-wrapper">
                              <input class="file-path validate" type="text" formControlName="fileName">
                          </div>
                          <label class="active" for="title" data-error="wrong" data-success="right" *ngIf="!isNew">File name</label>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col s12">
                      <div class="input-field">
                          <input id="mimeType" type="text" class="validate" formControlName="mimeType">
                          <label class="active" for="mimeType" data-error="wrong" data-success="right">MIME Type</label>
                      </div>
                  </div>
              </div>
              <div class="modal-footer">
                  <button class="btn  light-blue waves-effect" type="submit" [disabled]="!dataForm.valid || dataForm.untouched">Save<i class="material-icons right">save</i></button>
              </div>
          </form>
      </div>
  `,
  styles: []
})
export class DocumentDetailsComponent implements AfterViewInit, OnInit {
  document: Document;
  public dataForm: FormGroup;
  isNew = false;
  private file: File;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private documentGateway: DocumentGateway) {
  }

  // public accessors and mutators

  // event handling methods
  public ngAfterViewInit() {
    this.updateForm();
  }

  public ngOnInit() {
    this.initForm();
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (!isNullOrUndefined(id)) {
        if (id === 'new') {
          this.newDocument();
        } else {
          this.isNew = false;
          this.retrieveDocument(id);
        }
      }
    });
  }

  onSubmit() {
    this.saveForm();
  }

  onUpload(event) {
    const fileList: FileList = event.target.files;
    const file: File = fileList[0];
    if ( !isNullOrUndefined( file )) {
      this.document.fileName = file.name;
      this.document.mimeType = file.type;
      this.file = file;
      this.updateForm();
    }
  }

  // protected, private helper methods
  private createDocument() {
    this.documentGateway.add( this.file, this.document.path, this.document.title ).subscribe(
      response => {
        this.document = response;
        this.navigateToList();
      }
    )
  }

  private enableFileNameControl() {
    (<FormControl>this.dataForm.controls['fileName']).enable();
  }

  private navigateToList() {
    this.router.navigate(['/management/documents']);
  }

  private newDocument() {
    this.isNew = true;
    this.document = new Document('', null, '');
    this.updateForm();
    this.enableFileNameControl();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      console.log('An error occurred:', error.error.message);
    } else {
      console.log(`Backend returned code ${ error.status}, body was: ${ error.error }`);
    }
  }

  private initForm() {
    this.dataForm = this.formBuilder.group({
      title: [ this.document ? this.document.title : null, Validators.required],
      fileName: [{ value: this.document ? this.document.fileName : null, disabled: true }, [Validators.required, this.validateFileNameControl.bind( this )]],
      mimeType: [{ value: this.document ? this.document.mimeType : null, disabled: true }, Validators.required]
    });
  }

  private retrieveDocument(id: number): void {
    this.documentGateway.findById(id).subscribe(
      response => {
        this.document = response;
        this.updateForm();
      },
      error => {
        this.handleError(error);
      });
  }

  private saveDocument() {
    this.documentGateway.update( this.document ).subscribe(
      response => {
        this.document = response;
        this.navigateToList();
      }
    )
  }

  private saveForm(): void {
    this.document.title = this.dataForm.controls['title'].value;

    if ( this.isNew ) {
      this.createDocument()
    }else {
      this.saveDocument();
    }
  }

  private updateForm(): void {
    this.dataForm.reset();
    (<FormControl>this.dataForm.controls['title']).setValue(this.document ? this.document.title : '', {onlySelf: true});
    (<FormControl>this.dataForm.controls['fileName']).setValue(this.document ? this.document.fileName : null, {onlySelf: true});
    (<FormControl>this.dataForm.controls['fileName']).disable();
    (<FormControl>this.dataForm.controls['mimeType']).setValue(this.document ? this.document.mimeType : '', {onlySelf: true});
  }

  private validateFileNameControl( control: FormControl ): {[s: string]: boolean } {
    if ( this.isNew && isNullOrUndefined( control.value )) {
      return { 'fileNameIsMissing' : true };
    }else {
      return null;
    }
  }
}
