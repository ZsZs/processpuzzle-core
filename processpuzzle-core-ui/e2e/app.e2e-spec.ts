import { ProcessPuzzleCMSUIPage } from './app.po';

describe('process-puzzle-cms-ui App', () => {
  let page: ProcessPuzzleCMSUIPage;

  beforeEach(() => {
    page = new ProcessPuzzleCMSUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
