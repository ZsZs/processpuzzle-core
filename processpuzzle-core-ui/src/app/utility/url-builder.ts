import { environment } from '../../environments/environment';

export class UrlBuilder {
   constructor( private serviceProperties: string, private resourcePath: string ) {}

   public buildResourceUrl( subResource?: string ): string {
      let resourceUrl = environment[this.serviceProperties].protocol;
      resourceUrl += '//' + environment[this.serviceProperties].host;
      resourceUrl += Boolean( environment[this.serviceProperties].contextPath ) ? '/' + environment[this.serviceProperties].contextPath : '';
      resourceUrl += '/' + this.resourcePath;
      resourceUrl += Boolean( subResource ) ? '/' + subResource : '';
      return resourceUrl;
   }
}
