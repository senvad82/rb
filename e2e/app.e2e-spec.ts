import { ReceipeBookPage } from './app.po';

describe('receipe-book App', function() {
  let page: ReceipeBookPage;

  beforeEach(() => {
    page = new ReceipeBookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('rb works!');
  });
});
