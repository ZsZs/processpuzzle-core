import {Component, AfterViewInit, OnInit, EventEmitter} from '@angular/core';
import {Validators, FormControl, FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import {MaterializeAction} from 'angular2-materialize';

import {Desktop} from '../desktop';
import {Footer} from './footer';

@Component({
  selector: 'pp-footer-editor',
  templateUrl: './footer-editor.component.html'
})
export class FooterEditorComponent implements AfterViewInit, OnInit {
  modalActions = new EventEmitter<string|MaterializeAction>();
  public footerEditForm: FormGroup;
  footer: Footer;

  // constructors
  constructor( private router: Router, private formBuilder: FormBuilder, private desktop: Desktop ) {}

  // public accessors and mutators

  // event handling methods
  ngAfterViewInit() {
    this.openForm();
  }

  ngOnInit() {
    this.footer = isNullOrUndefined( this.desktop.footer ) ? new Footer() : this.desktop.footer;
    this.initForm();
  }

  onCancel() {
    this.closeForm();
    this.navigateBack();
  }

  onDelete() {
    this.closeForm();
    this.desktop.deleteFooter();
    this.navigateBack();
  }

  onSubmit() {
    this.saveForm();
    this.desktop.updateFooter( this.footer );
    this.closeForm();
    this.navigateBack();
  }

  // protected, private helper methods
  private closeForm(): void {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

  private initForm() {
    this.footerEditForm = this.formBuilder.group({
      copyrightText: [this.footer ? this.footer.copyrightText : null, Validators.required]
    });
  }

  private navigateBack() {
    this.router.navigate( ['../../'] );
  }

  private openForm(): void {
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  private saveForm() {
     this.footer.copyrightText = this.footerEditForm.controls['copyrightText'].value;
  }

  private updateForm() {
    (<FormControl>this.footerEditForm.controls['copyrightText']).setValue( this.footer.copyrightText, { onlySelf: true });
  }
}
