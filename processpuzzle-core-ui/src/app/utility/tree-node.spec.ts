
import {TreeNode} from './tree-node';

describe('TreeNode behaviour', () => {
  const rootName = 'Root_Name';
  const rootTitle = 'Root title';
  const rootReferencedObject = 'Root Ref.';
  let rootNode: TreeNode;

  const childOneName = 'Child_One_Name';
  const childOneTitle = 'Child one title';
  const childOneReferencedObject = 'Child one Ref.';
  let childOneNode: TreeNode;

  const childTwoName = 'Child_Two_Name';
  const childTwoTitle = 'Child two title';
  const childTwoReferencedObject = 'Child two Ref.';
  let childTwoNode: TreeNode;

  const childThreeName = 'Child_Three_Name';
  const childThreeTitle = 'Child three title';
  const childThreeReferencedObject = 'Child three Ref.';
  let childThreeNode: TreeNode;

  const grandChildOneName = 'Grand_Child_One_Name';
  const grandChildOneTitle = 'Grand child one title';
  const grandChildOneReferencedObject = 'Grandchild one Ref.';
  let grandChildOneNode: TreeNode;

  const grandChildTwoName = 'Grand_Child_Two_Name';
  const grandChildTwoTitle = 'Grand child two title';
  const grandChildTwoReferencedObject = 'Grandchild two Ref.';
  let grandChildTwoNode: TreeNode;

  beforeEach(() => {
    childOneNode = new TreeNode( childOneName, childOneTitle, childOneReferencedObject );
    childTwoNode = new TreeNode( childTwoName, childTwoTitle, childTwoReferencedObject );
    childThreeNode = new TreeNode( childThreeName, childThreeTitle, childThreeReferencedObject );
    grandChildOneNode = new TreeNode( grandChildOneName, grandChildOneTitle, grandChildOneReferencedObject );
    grandChildTwoNode = new TreeNode( grandChildTwoName, grandChildTwoTitle, grandChildTwoReferencedObject );
    childOneNode.addChild( grandChildOneNode );
    childTwoNode.addChild( grandChildTwoNode );
    rootNode = new TreeNode( rootName, rootTitle, rootReferencedObject );
    rootNode.addChild( childOneNode );
    rootNode.addChild( childTwoNode );
    rootNode.addChild( childThreeNode );
  });

  it('has name and title', () => {
    expect( rootNode.name ).toBe( rootName );
    expect( rootNode.title ).toBe( rootTitle );
  });

  it('can reference an arbitrary object', () => {
    expect( childOneNode.referencedObject ).toBe( childOneReferencedObject );
  });

  it( 'can have children', () => {
    expect( rootNode.children ).toContain( childOneNode );
    expect( rootNode.children ).toContain( childTwoNode );
    expect( rootNode.children ).toContain( childThreeNode );
  });

  it( 'children can have children', () => {
    expect( rootNode.children[0].children ).toContain( grandChildOneNode );
  });

  it( 'has parent', () => {
    expect( childOneNode.parent ).toBe( rootNode );
  });

  it( 'can compile parents backward path', () => {
    expect( grandChildOneNode.parents() ).not.toContain( grandChildOneNode );
    expect( grandChildOneNode.parents() ).toContain( childOneNode );
    expect( grandChildOneNode.parents() ).toContain( rootNode );
  });

  it( 'parents backward path can include current node', () => {
    expect( grandChildOneNode.parents( true ) ).toContain( grandChildOneNode );
  });

  it( 'can compile parents titles path', () => {
    expect( grandChildOneNode.parentTitles() ).not.toContain( grandChildOneNode.title );
    expect( grandChildOneNode.parentTitles() ).toContain( childOneNode.title );
    expect( grandChildOneNode.parentTitles() ).toContain( rootNode.title );
  });

  it( 'parents titles path can include current title', () => {
    expect( grandChildOneNode.parentTitles( true ) ).toContain( grandChildOneNode.title );
  });

  it( 'can compile parents referenced objects path', () => {
    expect( grandChildOneNode.parentReferencedObjects() ).not.toContain( grandChildOneNode.referencedObject );
    expect( grandChildOneNode.parentReferencedObjects() ).toContain( childOneNode.referencedObject );
    expect( grandChildOneNode.parentReferencedObjects() ).toContain( rootNode.referencedObject );
  });

  it( 'parents referenced objects path can include current referenced object', () => {
    expect( grandChildOneNode.parentReferencedObjects( true ) ).toContain( grandChildOneNode.referencedObject );
  });

  it( 'child can be removed from parent', () => {
    rootNode.removeChild( childOneNode );
    expect( childOneNode.parent ).not.toBe( rootNode );
    expect( rootNode.children ).not.toContain( childOneNode );
  });

  it( 'child can be find by name', () => {
    expect( rootNode.findChildByName( childTwoName ) ).toBe( childTwoNode );
  });

  it( 'descendant child can be find by name', () => {
    expect( rootNode.findDescendantChildByName( grandChildOneName ) ).toBe( grandChildOneNode );
    expect( rootNode.findDescendantChildByName( grandChildTwoName ) ).toBe( grandChildTwoNode );
  });

  it( 'child can be find by title', () => {
    expect( rootNode.findChildByTitle( childTwoTitle ) ).toBe( childTwoNode );
  });

  it( 'descendant child can be find by title', () => {
    expect( rootNode.findDescendantChildByTitle( grandChildOneTitle ) ).toBe( grandChildOneNode );
    expect( rootNode.findDescendantChildByTitle( grandChildTwoTitle ) ).toBe( grandChildTwoNode );
  });

  it( 'can be detached from the parent', () => {
    childOneNode.detach();
    expect( childOneNode.parent ).not.toBe( rootNode );
    expect( rootNode.children ).not.toContain( childOneNode );
  });

  it( 'can be deserialized from JSON', () => {
    const json = '{"name":"Root_Name", "title":"Root title", "children": [{"name":"Child_One_Name", "title":"Child one title"}, {"name":"Child_Two_Name", "title":"Child two title"}] }';
    const tree = TreeNode.parse( json );
    expect( tree.name ).toBe( rootName );
    expect( tree.title ).toBe( rootTitle );
    expect( tree.children[0].name ).toBe( childOneName );
  });
});
