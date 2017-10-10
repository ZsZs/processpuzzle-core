import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Desktop } from './desktop';
import { DesktopEditorToolbarComponent } from './desktop-editor-toolbar.component';

describe('DesktopEditorToolbarComponent', () => {
  let component: DesktopEditorToolbarComponent;
  let fixture: ComponentFixture<DesktopEditorToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopEditorToolbarComponent ],
      providers:    [ Desktop ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopEditorToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
