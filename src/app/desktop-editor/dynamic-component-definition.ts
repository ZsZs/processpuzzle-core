
export class DynamicComponentDefinition {
  context: any;
  selector: string;
  type: any;

  constructor( type: any, selector: string, context: any ) {
    this.type = type;
    this.selector = selector;
    this.context = context;
  }

}
