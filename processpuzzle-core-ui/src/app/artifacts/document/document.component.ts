import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'pp-document',
  template: `
      <div>
          <h4>Documents</h4>
          <div class="row">
              <div class="col s6">
                  <pp-document-list></pp-document-list>
              </div>
              <div class="col s6">
                  <router-outlet></router-outlet>
              </div>
          </div>
      </div>
  `,
  styles: []
})
export class DocumentComponent implements OnInit {

  ngOnInit() {
  }
}
