
import {isNullOrUndefined} from 'util';

export class TreeNode {
  private _children: TreeNode[] = new Array();
  private _parent: TreeNode;

  // static methods
  public static parse( json: string ): TreeNode {
    const tree = JSON.parse( json );
    return tree;
  }

  // constructors
  constructor( private _name: string, private _title: string, private _referencedObject?: any ) {}

  // public accessors and mutators
  public addChild( childNode: TreeNode ): void {
    this._children.push( childNode );
    childNode.parent = this;
  }

  public detach(): void {
    this._parent.removeChild( this );
  }

  public findChildByName( name: string ): TreeNode {
    let foundNode = null;
    this._children.forEach( child => {
      if ( child.name === name ) { foundNode = child; }
    });
    return foundNode;
  }

  public findChildByTitle( title: string ): TreeNode {
    let foundNode = null;
    this._children.forEach( child => {
      if ( child.title === title ) { foundNode = child; }
    });
    return foundNode;
  }

  public findDescendantChildByName( name: string ): TreeNode {
    let foundNode = null;
    this._children.forEach( child => {
      if ( child.name === name ) {
        foundNode = child;
      } else if ( this.hasChildren() ) {
        this.children.forEach( childNode => {
          const node = childNode.findDescendantChildByName( name );
          if ( !isNullOrUndefined( node )) { foundNode = node; }
        })
      }
    });
    return foundNode;
  }

  public findDescendantChildByTitle( title: string ): TreeNode {
    let foundNode = null;
    this._children.forEach( child => {
      if ( child.title === title ) {
        foundNode = child;
      } else if ( this.hasChildren() ) {
        this.children.forEach( childNode => {
          const node = childNode.findDescendantChildByTitle( title );
          if ( !isNullOrUndefined( node )) { foundNode = node; }
        })
      }
    });
    return foundNode;
  }

  public findDescendantChildByReferencedObject( evaluator: (any) => boolean ): TreeNode {
    let foundNode = null;
    this._children.forEach( child => {
      if ( evaluator( child.referencedObject )) {
        foundNode = child;
        return foundNode;
      } else if ( this.hasChildren() ) {
        this.children.forEach( childNode => {
          const node = childNode.findDescendantChildByReferencedObject( evaluator );
          if ( !isNullOrUndefined( node )) { foundNode = node; }
        })
      }
    });
    return foundNode;
  }

  public hasChildren(): boolean {
    return this._children.length > 0;
  }

  public parents( includeCurrent?: boolean ): TreeNode[] {
    const parents = new Array<TreeNode>();
    let parent = this._parent;

    if ( !isNullOrUndefined( includeCurrent ) && includeCurrent ) {
      parents.push( this );
    }

    while ( !isNullOrUndefined( parent )) {
      parents.push( parent );
      parent = parent.parent;
    }
    return parents;
  }

  public parentReferencedObjects( includeCurrent?: boolean ): any[] {
    const referencedObjects = new Array();

    if ( !isNullOrUndefined( includeCurrent ) && includeCurrent ) {
      referencedObjects.push( this._referencedObject );
    }

    this.parents().forEach( parent => {
      referencedObjects.push( parent.referencedObject );
    });
    return referencedObjects;
  }

  public parentTitles( includeCurrent?: boolean ): string[] {
    const titles = new Array<string>();

    if ( !isNullOrUndefined( includeCurrent ) && includeCurrent ) {
      titles.push( this._title );
    }

    this.parents().forEach( parent => titles.push( parent.title ));
    return titles;
  }

  public removeChild( childNode: TreeNode ) {
    this._children = this._children.slice( this._children.lastIndexOf( childNode ) - 1, 1 );
    childNode.parent = null;
  }

  // properties
  public get children(): TreeNode[] {
    return this._children;
  }

  public get name(): string {
    return this._name;
  }

  public get parent(): TreeNode {
    return this._parent;
  }

  public get referencedObject(): any {
    return this._referencedObject;
  }

  public get title(): string {
    return this._title;
  }

  public set parent( parent: TreeNode ) {
    this._parent = parent;
  }

  public set referencedObject( anObject: any ) {
    this._referencedObject = anObject;
  }
}
