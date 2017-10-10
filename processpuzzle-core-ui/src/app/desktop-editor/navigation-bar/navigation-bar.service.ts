import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {NavigationBar} from './navigation-bar';
import {UrlBuilder} from '../../utility/url-builder';

@Injectable()
export class NavigationBarService {
   public static readonly SERVICE_PROPERTIES = 'navigationBarService';
   public static readonly RESOURCE_PATH = 'navigationbars.json';
   private headers: HttpHeaders = new HttpHeaders();
   private urlBuilder = new UrlBuilder(NavigationBarService.SERVICE_PROPERTIES, NavigationBarService.RESOURCE_PATH);

   // constructors
   constructor(private http: HttpClient) {
      this.headers.set('Content-Type', 'application/json');
      this.headers.set('Access-Control-Allow-Origin', '*');
   }

   // public accessors and mutators
   delete(navigationBar: NavigationBar): Observable<any> {
      const resourceUrl = this.urlBuilder.buildResourceUrl(String(navigationBar.id));
      return this.http.delete(resourceUrl);
   }

   findAll(): Observable<NavigationBar[]> {
      const headers = this.headers;
      return this.http.get<NavigationBar[]>(this.urlBuilder.buildResourceUrl(), {headers} );
   }

   findById(index: number): Observable<NavigationBar> {
      return this.http.get<NavigationBar>(this.urlBuilder.buildResourceUrl( String( index )));
   }

   save(navigationBar: NavigationBar): Observable<NavigationBar> {
      const body = JSON.stringify(navigationBar);
      if (navigationBar.id) {
         return this.update( navigationBar.id, body, this.headers);
      } else {
         return this.add(body, this.headers );
      }
   }

   // protected, private helper methods
   private add(body: string, headers: HttpHeaders): Observable<NavigationBar> {
      return this.http.post<NavigationBar>(this.urlBuilder.buildResourceUrl(), body );
   }

   private update(id: number, body: string, headers: HttpHeaders): Observable<NavigationBar> {
      return this.http.put<NavigationBar>(this.urlBuilder.buildResourceUrl( String(id)), body, {headers});
   }

}
