import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class Document {
  @JsonProperty( 'id', Number, true ) private _id: number = undefined;
  @JsonProperty( 'fileName', String ) private _fileName: string = undefined;
  @JsonProperty( 'mimeType', String ) private _mimeType: string = undefined;
  @JsonProperty( 'path', String, true ) private _path: string = undefined;
  @JsonProperty( 'title', String, false ) private _title: string = undefined;

  constructor( title: string, fileName: string, mimeType: string, path?: string ) {
    this._title = title;
    this._fileName = fileName;
    this._mimeType = mimeType;
    this._path = path;
  }

  // properties
  // @formatter:off
  get id(): number { return this._id; }
  get fileName(): string { return this._fileName; }
  set fileName(value: string) { this._fileName = value; }
  get mimeType(): string { return this._mimeType; }
  set mimeType(value: string) { this._mimeType = value; }
  get path(): string { return this._path; }
  set path(value: string) { this._path = value; }
  get title(): string { return this._title; }
  set title(value: string) { this._title = value; }
  // @formatter:on
}
