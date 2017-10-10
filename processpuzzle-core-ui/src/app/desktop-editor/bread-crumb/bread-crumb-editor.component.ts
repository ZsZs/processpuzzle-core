import {Component, AfterViewInit, OnInit, ViewChild, EventEmitter} from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ModalDirective} from 'ng2-bootstrap';
import {Router} from '@angular/router';
import {Desktop} from '../desktop';
import {BreadCrumb} from './bread-crumb';
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'pp-bread-crumb-editor',
  templateUrl: './bread-crumb-editor.component.html'
})
export class BreadCrumbEditorComponent implements AfterViewInit, OnInit {
  modalActions = new EventEmitter<string|MaterializeAction>();
  public breadCrumbEditForm: FormGroup;
  breadCrumb: BreadCrumb;

  // constructors
  constructor( private router: Router, private formBuilder: FormBuilder, private desktop: Desktop ) {
    this.breadCrumb = desktop.breadCrumb;
  }

  // public accessors and mutators
  ngAfterViewInit() {
    this.openForm();
  }

  ngOnInit() {
    this.breadCrumb = this.desktop.breadCrumb;
    this.initForm();
  }

  onCancel() {
    this.closeForm();
    this.navigateBack();
  }

  onDelete() {
    this.closeForm();
    this.desktop.deleteBreadCrumb();
    this.navigateBack();
  }

  onSubmit() {
    this.breadCrumb = this.breadCrumbEditForm.value;
    this.desktop.updateBreadCrumb( this.breadCrumb );
    this.closeForm();
    this.navigateBack();
  }

  // protected, private helper methods
  private closeForm() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

  private initForm() {
    this.breadCrumbEditForm = this.formBuilder.group({
//      brand: [this.breadCrumb ? this.breadCrumb.brand : null, Validators.required]
    });
  }

  private navigateBack() {
    this.router.navigate( ['../../'] );
  }

  private openForm(): void {
  this.modalActions.emit({action: 'modal', params: ['open']});
  }


  private updateForm() {
//    (<FormControl>this.breadCrumbEditForm.controls['brand']).setValue( this.breadCrumb.brand, { onlySelf: true });
  }
}
