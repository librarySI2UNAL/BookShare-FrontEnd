import { BooksharePage } from './app.po';

describe('bookshare App', () => {
  let page: BooksharePage;

  beforeEach(() => {
    page = new BooksharePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
