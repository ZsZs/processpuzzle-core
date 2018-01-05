import { async, ComponentFixture, fakeAsync, tick, TestBed } from '@angular/core/testing';

import { ContentActions, Desktop } from './desktop';
import { DesktopEditorToolbarComponent } from './desktop-editor-toolbar.component';

describe('DesktopEditorToolbarComponent', () => {
  let component: DesktopEditorToolbarComponent;
  let desktop: Desktop;
  let desktopContentActionSpy;
  let fixture: ComponentFixture<DesktopEditorToolbarComponent>;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopEditorToolbarComponent ],
      providers:    [ Desktop ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent( DesktopEditorToolbarComponent );
    component = fixture.componentInstance;
    desktop = fixture.debugElement.injector.get( Desktop );
    desktopContentActionSpy = spyOn( desktop, 'contentAction' );
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect( component ).toBeTruthy();
  });

  it('onEditContent() notifies desktop about content action', () => {
     component.onEditContent();
     expect( desktopContentActionSpy ).toHaveBeenCalledWith( ContentActions.EditContent );
  });

  it('onShowEditor() outputs onShowEditorEvent', fakeAsync(() => {
     component.onShowEditorEvent.subscribe(( value: boolean ) => {
       expect( value ).toBeTruthy();
    });
    component.onShowEditor();
    tick();
  }));
});
