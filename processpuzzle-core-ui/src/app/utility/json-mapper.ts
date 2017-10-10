import {Injectable} from '@angular/core';
import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';

@Injectable()
export class JsonMapper {
  private readonly jsonConvert: JsonConvert = new JsonConvert();

  constructor() {
    this.jsonConvert.operationMode = OperationMode.LOGGING; // print some debug data
    this.jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
    this.jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null
  }

  // public accessors and mutators
  public deserialize( json: any, classReference: { new(): any }): any {
    return (<any>this.jsonConvert).deserialize( json, classReference );
  }

  public deserializeArray(jsonArray: any[], classReference: { new(): any }): any[] {
    return (<any>this.jsonConvert).deserializeArray( jsonArray, classReference );
  }

  public serialize( data: any ): any {
    return this.jsonConvert.serialize( data );
  }
}
