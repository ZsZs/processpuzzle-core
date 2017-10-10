import {Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {NavigationBar} from './navigation-bar';
import {NavigationBarService} from './navigation-bar.service';
import {Desktop} from '../desktop';
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'pp-navigation-bar-editor',
  templateUrl: 'navigation-bar-editor.component.html'
})

export class NavigationBarEditorComponent implements AfterViewInit, OnInit {
  modalActions = new EventEmitter<string|MaterializeAction>();
  public navbarEditForm: FormGroup;
  navigationBar: NavigationBar;

  // constructors
  constructor( private router: Router, private formBuilder: FormBuilder, private desktop: Desktop, private navigationBarService: NavigationBarService) {
    this.navigationBar = desktop.navigationBar;
  }

  // public accessors and mutators
  ngAfterViewInit() {
    this.openForm();
  }

  ngOnInit() {
    this.navigationBar = this.desktop.navigationBar;
    this.initForm();
  }

  onCancel() {
    this.closeForm();
    this.navigateBack();
  }

  onDelete() {
    this.closeForm();
    this.navigationBarService.delete( this.navigationBar ).subscribe(
       ( success ) => {
         this.navigationBar = null;
         this.desktop.deleteNavigationBar();
         this.navigateBack();
       }
    );
  }

  onSubmit() {
    this.navigationBar = this.navbarEditForm.value;
    this.navigationBarService.save( this.navigationBar ).subscribe(
       ( navigationBar ) => {
         this.desktop.updateNavigationBar( this.navigationBar );
         this.navigateBack();
       }
    );
    this.closeForm();
  }

  // protected, private helper methods
  private closeForm(): void {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

  private initForm() {
    this.navbarEditForm = this.formBuilder.group({
      brand: [this.navigationBar ? this.navigationBar.brand : null, Validators.required]
    });
  }

  private navigateBack() {
    this.router.navigate(['../../']);
  }

  private openForm(): void {
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  private updateForm() {
    (<FormControl>this.navbarEditForm.controls['brand']).setValue( this.navigationBar.brand, { onlySelf: true });
  }
}
