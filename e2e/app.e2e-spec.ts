import { ImageSelectorPage } from './app.po';

describe('image-selector App', () => {
  let page: ImageSelectorPage;

  beforeEach(() => {
    page = new ImageSelectorPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
